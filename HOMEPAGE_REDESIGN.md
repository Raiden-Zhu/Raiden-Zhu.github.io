# Research website redesign

## Current implementation
The approved compact ivory/serif/lavender homepage is retained. Research now opens
`/publications/`; Writing opens `/blog/`; Talks opens `/teaching/`. The DICE article
keeps its existing `/blog/2025/DICE/` address with a matching reading layout.

- `_pages/about.md`: curated homepage, four selected publications, biography,
  two personal statements, inline topic links, news and Beyond Research.
- `_layouts/research-home.html`: shared document shell and navigation.
- `assets/css/research-home.css`: approved homepage components and tokens.
- `assets/css/research-pages.css`: scoped archive and article styles.
- `_bibliography/papers.bib`: publication metadata source.
- `scripts/build-research-archives.py`: dependency-free Python generator for
  the three static archive pages and their JSON snapshots. Curated summaries,
  artwork mapping and Writing entries live in this script.
- `_data/research/talks-source.md`: preserved original talk records. The literal
  `video-English → url` placeholder is omitted in the generated archive.
- `_layouts/research-article.html`: DICE article layout with original research
  figures, resource links, MathJax 3 support and article navigation.

Run `python3 scripts/build-research-archives.py` after editing archive sources.
Homepage summaries remain manually curated. The unused DSGD-SAM Distill demo
(Einstein/Podolsky/Rosen sample authors) is unpublished; Writing links to the
existing actual DSGD-SAM project instead. External articles remain external.

## Artwork
All eight publication thumbnails use 200 × 112.5 CSS pixel slots, matching venue
badges and page-blended warm backgrounds. Existing approved thumbnails are
retained. New high-resolution qualitative illustrations: `lsn-hd.webp`,
`supernorm-hd.webp`, `ace-glt-hd.webp`, `cia-hd.webp`, generated with built-in ImageGen
from original paper figures and bibliography abstracts, using DICE/SAM as style
references. No empirical values are represented by the illustrations.

## Source clarification
LSN's author list was updated to the six authors on the current author-submitted
arXiv record: https://arxiv.org/abs/2406.09189 . The original site's list omitted
Yeyu Zhang and used a different Xu/Wang order. Other author lists preserve the
repository bibliography. The saved publication screenshot precedes this small
metadata correction. SuperNorm links to its published DOI; the archive preserves
its existing repository author list because the publisher page was unavailable.

## Local preview and deployment
Run `npm install`, then `npm run dev -- --host 0.0.0.0 --port 4173` with Node 20+.
Only the DICE Markdown preview uses the pinned `marked` development dependency;
production still uses Jekyll/Kramdown. Analytics are omitted in local preview.
The preview supports home, publications, Writing, Talks and DICE. Preview-only
`/__mobile-check?path=/publications/` embeds a 390px responsive view.

Desktop home/archive visual comparison and the Research → Writing transition
were verified in the browser. Further DICE/Talks and mobile browser checks were
blocked by the cloud browser URL security policy, without attempting a bypass.
Local rendering resolved every template; local images and internal anchors exist.
Ruby/Jekyll is unavailable here: run the existing Jekyll CI before deployment.
No changes have been pushed or published.

## Latest additions
The archive now contains 10 entries after adding DTOA (Preprint 2026) and
Imagining a Democratic, Affordable Future of Foundation Models (Book chapter,
Springer 2026). Springer records first-online publication in 2025 but its formal
citation uses 2026; the archive follows the formal citation.
Source: https://link.springer.com/chapter/10.1007/978-3-031-95418-4_16
Source: https://arxiv.org/abs/2608.09256
Both new assets were generated with built-in ImageGen at 1672×941 using the
existing pastel publication style. Prompt concepts and verification are in
design-qa.md. The homepage's four Selected Research entries remain unchanged.
