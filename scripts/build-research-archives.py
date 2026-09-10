from pathlib import Path
import re,json,html
R=Path(__file__).resolve().parents[1]; esc=html.escape
bib=(R/'_bibliography/papers.bib').read_text(); entries=[]
for m in re.finditer(r'@\w+\s*\{([^,]+),',bib):
 start=m.end(); depth=1; i=start
 while i<len(bib) and depth:
  if bib[i]=='{': depth+=1
  if bib[i]=='}': depth-=1
  i+=1
 text=bib[start:i-1]; fields={}
 for f in re.finditer(r'(\w+)\s*=\s*\{',text):
  j=f.end(); d=1; k=j
  while k<len(text) and d:
   if text[k]=='{':d+=1
   if text[k]=='}':d-=1
   k+=1
  fields[f.group(1)]=text[j:k-1].strip()
 fields['id']=m.group(1); entries.append(fields)
curation={
'zhu2026surprising':('single-merge-hd.webp','A single final merge can recover performance after sparse communication, connecting model mergeability with decentralized training dynamics.'),
'zhu2026teamorchestration':('team-orchestration-hd.webp','Supervisor networks coordinate team learning under imperfect beliefs, with resilience to misleading reports from Byzantine teams.'),
'he2026decentralisedfoundation':('decentralised-foundation-hd.webp','A review of decentralised foundation models, covering shared resources, incentive mechanisms, and training in heterogeneous environments.'),
'openreview-dice25':('dice-hd.webp','DICE traces how data influence cascades through a decentralized network, shaped by data, communication topology, and loss curvature.'),
'jiang2024lie':('lsn-hd.webp','Lie Symmetry Net incorporates symmetries and associated conservation laws when learning solutions to differential equations.'),
'pmlr-zhu23':('dsgd-sam-pastel.webp','Decentralized SGD and average-direction SAM are asymptotically equivalent, connecting decentralized training with implicit sharpness regularization.'),
'10.1145/3580305.3599388':('supernorm-hd.webp','SuperNorm incorporates local subgraph structure into normalization to improve GNN expressivity and alleviate over-smoothing.'),
'wang2023adversarial':('ace-glt-hd.webp','ACE-GLT reconsiders pruned graph connections and model weights to refine sparse graph lottery tickets.'),
'liu2023':('cia-hd.webp','Contrastive identity-aware learning distinguishes agents’ temporal credits to encourage diverse behaviors in cooperative multi-agent learning.'),
'pmlr-v162-zhu22d':('topology-hd.webp','Network topology affects how decentralized SGD generalizes, linking graph connectivity with learning performance.')}
byid={p['id']:p for p in entries}
assert set(curation)==set(byid),(list(byid),list(curation))
for key,(img,summary) in curation.items():
 p=byid[key];p['image']=img;p['summary']=summary
 p['title']=p['title'].replace('{','').replace('}','')
 p['authors']=[' '.join(reversed(a.strip().split(', '))) for a in p['author'].split(' and ')]
 p['links']={}
 paper=p.get('pdf') or p.get('url')
 if key=='zhu2026surprising':paper='https://openreview.net/forum?id=lWGMbJRCtQ'
 if key=='10.1145/3580305.3599388':paper='https://doi.org/10.1145/3580305.3599388'
 if key=='jiang2024lie':paper='https://openreview.net/forum?id=rkfop9GyxB'
 p['links']['Chapter' if key=='he2026decentralisedfoundation' else 'Paper']=paper
 for k in ['code','slides','poster']:
  if p.get(k):p['links'][k.title()]=p[k]
 if key=='zhu2026surprising':p['links']['Blog']=p['url']
 if key=='openreview-dice25':p['links']['Project']='/blog/2025/DICE/'
(R/'_data/research/publications.json').write_text(json.dumps([byid[k] for k in curation],ensure_ascii=False,indent=2)+'\n')

def link(url,label):return f'<a href="{esc(url,quote=True)}">{esc(label)}</a>'
def links(d):return '<div class="paper-links">'+''.join(link(u,n) for n,u in d.items())+'</div>'
def head(title,path,intro,eyebrow):return f'''---\nlayout: research-home\ntitle: {title}\npermalink: {path}\n---\n<main id="main" class="archive-page"><header class="archive-header"><a class="back-link" href="/">← Home</a><p class="eyebrow">{eyebrow}</p><h1>{title}</h1><p class="archive-intro">{intro}</p></header>'''
def row(p,n):
 primary=next(iter(p['links'].values()))
 authors=', '.join(f'<strong>{esc(a)}</strong>' if a == "Tongtian Zhu" else esc(a) for a in p["authors"])
 return f'''<article class="paper" id="paper-{n}"><a class="paper-visual" href="{esc(primary)}" aria-label="Read {esc(p['title'])}"><span class="venue-badge">{esc(p['abbr'])}</span><img src="/assets/img/publication_preview/{p['image']}" alt="{esc(p['summary'])}" width="1672" height="941" loading="lazy"></a><div class="paper-body"><p class="paper-kicker"><span>{n:02d}</span><span>{esc(p['abbr'])}</span></p><h3>{link(primary,p['title'])}</h3><p class="takeaway">{esc(p['summary'])}</p><p class="authors">{authors}</p>{links(p['links'])}</div></article>'''
pubs=list(byid[k] for k in curation)
s=head('All publications','/publications/','Research on learning mechanisms, decentralized training, and related problems. '+link('https://scholar.google.com/citations?user=QvBDUsIAAAAJ&hl=en','Google Scholar ↗'),'Research archive')
s+='<nav class="year-nav" aria-label="Publication years">'+''.join(link('#year-'+y,y) for y in ['2026','2025','2023','2022'])+'</nav>'
for y in ['2026','2025','2023','2022']:
 s+=f'<section class="year-section" id="year-{y}" aria-labelledby="heading-{y}"><h2 class="year-label" id="heading-{y}">{y}</h2>'+''.join(row(p,i+1) for i,p in enumerate(pubs) if p['year']==y)+'</section>'
s+='</main>\n';(R/'_pages/publications.md').write_text(s)
# Preserve the original talk records and URLs, omitting only the literal placeholder URL.
talk_source=(R/'_data/research/talks-source.md').read_text(); talks=[];year=''
for line in talk_source.splitlines():
 if line.startswith('###'): year=re.search(r'20\d{2}',line)[0]
 if not line.startswith('- '):continue
 title=re.search(r'\*\*(.*?)\*\*',line)[1].strip().rstrip('.')
 remainder=line.split('**',2)[2];desc_match=re.search(r'_(.*?)_\.',remainder);desc=desc_match[1].replace('Invitied','Invited')
 found=list(re.finditer(r'\[([^\]]+)\]\(([^)]+)\)',remainder))
 all_links={}
 for m in found:
  u=m[2];label=m[1].lstrip('[')
  if u=='url':continue
  if u=='https://raiden-zhu.github.io/blog/2025/DICE/':u='/blog/2025/DICE/'
  if m.start()<desc_match.end(): continue
  labels={'twitter threads':'Thread','project page':'Project','video-Chinese':'Video · 中文','slides':'Slides','poster':'Poster','video':'Video','paper':'Paper'}
  all_links[labels.get(label,label)]=u
 desc=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',lambda m:link(m[2],m[1]),desc)
 # Dates are already preserved in each event description.
 talks.append(dict(year=year,title=title,description=desc,links=all_links))
assert len(talks)==11
(R/'_data/research/talks.json').write_text(json.dumps(talks,ensure_ascii=False,indent=2)+'\n')
s=head('Talks','/teaching/','Invited talks, conference presentations, and seminars.','In conversation')
s+='<nav class="year-nav" aria-label="Talk years">'+''.join(link('#year-'+y,y) for y in ['2025','2024','2023','2022'])+'</nav>'
for y in ['2025','2024','2023','2022']:
 s+=f'<section class="year-section" id="year-{y}"><h2 class="year-label">{y}</h2>'
 for t in talks:
  if t['year']!=y:continue
  s+=f'<article class="talk-row"><h3>{esc(t["title"])}</h3><p>{t["description"]}</p>{links(t["links"])}</article>'
 s+='</section>'
s+='</main>\n';(R/'_pages/teaching.md').write_text(s)
writing=[('2026','Research perspective','Single global merging in decentralized learning','When is communication most valuable? A closer look at sparse gossip, one final merge, and mergeability without strict consensus.','single-merge-hd.webp',byid['zhu2026surprising']['url'],'Read essay ↗'),('2025','Research explainer','DICE: Data Influence Cascade in Decentralized Learning','Following data influence across a peer-to-peer network—from the motivation to the theory and practical applications.','dice-hd.webp','/blog/2025/DICE/','Read article →'),('2023','Research project','Decentralized SGD and Average-direction SAM','The connection between decentralized optimization, sharpness-aware minimization, and generalization.','dsgd-sam-pastel.webp','https://github.com/Raiden-Zhu/ICML-2023-DSGD-and-SAM','Visit project ↗')]
s=head('Writing','/blog/','Notes and longer explanations behind the papers.','Ideas in detail')
for year,kind,title,desc,img,url,cta in writing:
 s+=f'<article class="writing-row"><a class="writing-visual" href="{esc(url)}" aria-label="{esc(title)}"><img src="/assets/img/publication_preview/{img}" alt="" width="1672" height="941"></a><div><p class="eyebrow">{year} · {kind}</p><h2>{link(url,title)}</h2><p>{esc(desc)}</p><a class="read-link" href="{esc(url)}">{cta}</a></div></article>'
s+='<div class="archive-end">'+link('/publications/','Explore all publications →')+'</div></main>\n';(R/'blog/index.html').write_text(s)
print(f'Created {len(pubs)} publication rows, 11 talks and 3 writing entries.')
