// Exact static archive/homepage preview, plus Markdown rendering for the DICE article.
// Production remains Jekyll; analytics are omitted here.
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const args=process.argv.slice(2);
const port=Number(args[args.indexOf('--port')+1])||4173;
const host=args.includes('--host')?args[args.indexOf('--host')+1]:'0.0.0.0';
const routes={'/':'_pages/about.md','/publications/':'_pages/publications.md','/blog/':'blog/index.html','/teaching/':'_pages/teaching.md','/blog/2025/DICE/':'_posts/2025-03-15-DICE.md'};
const strip=s=>s.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const mime={'.css':'text/css','.js':'application/javascript','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.gif':'image/gif','.webp':'image/webp','.woff2':'font/woff2','.pdf':'application/pdf'};
export async function page(path){
 const source=await readFile(resolve(root,routes[path]),'utf8');
 const title=source.match(/^title:\s*(.+)$/m)[1].replace(/^"|"$/g,'');
 let content=strip(source);
 if(path==='/blog/2025/DICE/'){
  const {marked}=await import(require.resolve('marked'));
  content=content.replace(/<!--[^]*?-->/g,'').replace(/{% highlight \w+ %}([^]*?){% endhighlight %}/g,(_,code)=>'<pre><code>'+escape(code.trim())+'</code></pre>');
  const maths=[];
  content=content.replace(/\$\$([^]*?)\$\$/g,(_,tex)=>{const display=tex.includes('\n');maths.push(escape((display?'\\[':'\\(')+tex+(display?'\\]':'\\)')));return `MATHPLACEHOLDER${maths.length-1}END`;});
  content=marked.parse(content).replace(/MATHPLACEHOLDER(\d+)END/g,(_,i)=>maths[i]);
  content=content.replace(/<h([2-6])>([^]*?)<\/h\1>/g,(_,n,text)=>`<h${n} id="${text.replace(/<[^>]+>/g,'').toLowerCase().replace(/[^a-z0-9 -]/g,'').trim().replace(/\s+/g,'-')}">${text}</h${n}>`);
  content=strip(await readFile(resolve(root,'_layouts/research-article.html'),'utf8')).replace('{{ content }}',content);
 }
 const layout=await readFile(resolve(root,'_layouts/research-home.html'),'utf8');
 return layout.replace('{{ content }}',content).replaceAll('{{ page.title }}',escape(title)).replaceAll('{{ page.url }}',path).replace(/\{\{\s*'([^']*)'\s*\|\s*relative_url\s*\}\}/g,'$1').replace(/\{%\s*include (visitor-stats\.html|scripts\/analytics\.html)\s*%\}/g,'');
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) createServer(async(req,res)=>{try{
 const url=new URL(req.url,'http://preview.invalid');let path=url.pathname;
 if(path==='/index.html')path='/';
 if(routes[path+'/']){res.writeHead(301,{Location:path+'/'});res.end();return;}
 if(routes[path]){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(await page(path));return;}
 if(path==='/__mobile-check'){
  const target=routes[url.searchParams.get('path')]?url.searchParams.get('path'):'/';
  res.writeHead(200,{'Content-Type':'text/html'});res.end(`<!doctype html><title>Mobile layout check</title><body style="margin:0;background:#e5e5e5"><iframe title="Mobile preview" src="${target}" style="display:block;width:390px;height:844px;border:0;margin:20px auto"></iframe>`);return;
 }
 if(['/resources/','/news/'].includes(path)){res.writeHead(302,{Location:'https://raiden-zhu.github.io'+path});res.end();return;}
 if(!path.startsWith('/assets/')){res.writeHead(404);res.end('Not found');return;}
 const assetRoot=resolve(root,'assets');const file=resolve(root,'.'+decodeURIComponent(path));
 if(!file.startsWith(assetRoot+sep)||!(await stat(file)).isFile()){res.writeHead(404);res.end();return;}
 res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream'});res.end(await readFile(file));
 }catch(error){console.error(error.message);res.writeHead(404);res.end('Not found');}
}).listen(port,host,()=>console.log(`Research site preview running on port ${port}`));
