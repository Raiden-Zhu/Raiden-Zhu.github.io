# Homepage design QA

final result: passed

Scope: the rendered homepage preview, not a complete production Jekyll build.

## Evidence

- Source visual direction: `/workspace/scratch/071eedbc6286/generated_images/exec-68522a90-3bb2-4b25-9402-06c304f26532.png` (946 × 1663 pixels).
- Existing source screenshots: `/workspace/scratch/raiden-audit-01.jpg` and `/workspace/scratch/raiden-audit-02.jpg`.
- Rendered implementation: `/workspace/scratch/raiden-redesign-desktop.jpg` (1348 × 2575 pixels).
- Desktop CSS viewport: 1363 × 936, devicePixelRatio 1; scrollbar excluded from the captured content width.
- State: homepage, light theme, all paper details collapsed.
- Narrow-screen check: a 390 × 844 CSS-pixel iframe, with 375px content viewport after scrollbar; scrollWidth = clientWidth = 375.
- The visual direction and implementation were opened together in one comparison call. They are different full-page heights because the implementation includes complete verified authors, service, contact, and expanded-detail controls. Comparison is structural rather than a claim of pixel identity.
- Focused live captures separately inspected the desktop hero, selected-paper rows with an expanded explanation, mobile hero, mobile research rows, and dark-mode hero. Text and controls were readable at these focused views.

## Required visual surfaces

- Typography: consistent Georgia display/section typography and system sans-serif body; deliberate replacement of the mock's all-serif body. Headings wrap without clipping on the tested widths. No external font dependencies.
- Spacing: aligned 1080px content grid, three desktop research areas, four separated paper rows, stacked mobile layout; no horizontal overflow on tested desktop or narrow screen.
- Color: warm paper, dark ink, muted purple accent, restrained distinction for Oral/Spotlight. Dark theme switches text, borders, and surfaces together. Full WCAG conformance has not been audited.
- Images: all five images load. Original portrait and research figures intentionally replace the mock's generated conceptual thumbnails. No generated quantitative results or fabricated personal drawing are used. Original thumbnails link to the paper for detailed reading.
- Content: all four papers, authors, awards, and news dates were reconciled with the original repository. Invented news entries from the mock were discarded. The unpublished July 2026 announcement was not surfaced. Complete bibliography remains on the existing publications page.

## Interactions checked

- Research anchor navigates to the selected research section.
- First paper's Why it matters disclosure opens and reveals its explanatory paragraph.
- All publications navigates to the existing public publications page; browser back returns to the preview.
- Theme toggle switches dark/light and updates aria-label and aria-pressed.
- Mobile research anchor works in a narrow iframe.
- All local anchor targets exist, links have nonempty href values, and all page images report loaded.
- Browser console checked: only browser-extension metadata transport errors were observed; no homepage application error was observed.
- `git diff --check` and Node syntax checks pass.

## Comparison history and findings

- Initial completed render: no actionable P0/P1/P2 layout issue found in the inspected states. No visual fixes were required after the comparison.
- Expected deviations: original figures, complete authors, accurate news, additional academic service/contact information, text-only social links, smaller portrait, system-sans body, and functional theme/disclosure controls. These support the requested factual reorganization and existing-site integration.
- P3: bespoke simplified thumbnails could improve figure readability in a future iteration; this version deliberately reuses original research assets.

## Limits before publication

Ruby/Jekyll is unavailable in this environment. The preview renders the exact homepage content and layout, substituting the root-relative URL filter and omitting production analytics includes. Run the normal repository build/CI and verify visitor statistics before publishing. Other page designs remain unchanged, and preview navigation to those pages opens the existing live site. Native mobile-browser behavior and exhaustive accessibility checks were not tested.

## Revision 2 — personal statements and original DSGD figure

- Desktop evidence: `/workspace/scratch/raiden-desktop-v2.jpg`; same desktop viewport, light theme, closed dialog and disclosures.
- Retained both user-authored statements verbatim: the future-generations statement follows the hero biography; the research/products statement introduces selected research.
- Third figure remains the original repository bitmap. Only its thumbnail display saturation changes (`saturate(.56)`); the enlarged dialog shows the unmodified source, preserving all formulas, geometry, and arrows.
- Compared with the accepted desktop baseline and supplied figure. Intentional changes are limited to statement placement and the third thumbnail/control. No actionable layout regressions found.
- Desktop dialog opens, is labelled, and closes with Escape. Narrow iframe screenshot inspected after edits; contentWidth = scrollWidth = 375 CSS pixels.
- JavaScript syntax and whitespace checks pass. Production build limitation remains unchanged.
- final result: passed

## Revision 3 — coordinated editorial thumbnails

- User reference: `/workspace/scratch/071eedbc6286/upload/499497ee-695a-41a9-bcf2-1b8e940ee149.png`.
- Four new qualitative editorial thumbnails replace the homepage's mixed original figures. They illustrate final model merging, network data influence, the decentralized SGD/average-direction SAM connection, and topology/generalization. They are not quantitative plots or replacements for the original scientific figures.
- Thumbnail art uses warm ivory, muted lavender/blue/sage/terracotta, and fine network/landscape linework. The technical DSGD/SAM source figure remains unmodified in the enlargement dialog. The topology thumbnail does not assign high/low generalization labels to individual nodes.
- Rendered evidence: `/workspace/scratch/raiden-research-v3.jpg`; desktop research section inspected with all four WebP assets reporting loaded.
- New assets use WebP encoding of the generated source images for page weight. Existing original paper assets are preserved.
- Existing layout, both personal statements, and paper metadata remain unchanged. No actionable P0/P1/P2 findings in the scoped thumbnail update.
- final result: passed

## Compact desktop and research-link revision — passed
- Restored all seven research-interest links from the original homepage, preserving their original destinations.
- Research areas now list concrete interests; removed the Foundations label and simplified the biography.
- Desktop portrait reduced from 262×278 to 226×240; reduced hero, section, and paper spacing while preserving the approved three-column structure.
- Both personal statements remain verbatim, in the biography and selected-publications introduction.
- Verified desktop 1348px and mobile document 375px: no horizontal overflow; all research images loaded. Original SAM figure remains accessible through the existing figure dialog.
- Production Jekyll build remains unverified; this revision is available in the running local preview, not deployed.

## Reference-density refinement — passed
- Restored complete research-area sentences with all seven original URLs embedded in matching topic phrases; no fundamental claim.
- Desktop content width 960px; portrait centered on both axes inside its right-hand grid area.
- Serif biography, research descriptions, and publication summaries match reference density. Author and resource links share a row; each collapsed publication row is 165px at the verified desktop viewport.
- Desktop document 1348px and mobile document 375px show no horizontal overflow. Both quotes and the approved image assets retained.
- Preview checked visually; production Jekyll build remains unverified and no deployment performed.

## First-version restoration — final result: passed
- Exact target: uploaded d4760cc8-6a2e-4742-9bcf-ceadfa371389.png (946×1663).
- Reused the supplied merge, DICE, topology, monogram, profile icons, and West Lake sketch assets; extracted individual assets from the approved reference without regenerating them. SAM keeps the approved newer illustration and original-figure dialog.
- Rebuilt CSS around the reference's 864px content width, serif typography, compact publication rows, simple three-link header, and two-column Recent Updates / Beyond Research ending. Removed later-added homepage service, contact, disclosure, theme, and archive elements to restore the selected composition.
- Reference and desktop capture inspected side by side at equal content scale. The 946px center crop of the desktop capture is 1676px tall; reference is 1663px. Main intended deviations: smaller centered portrait, linked research interests, new SAM illustration, motto below Selected research, factual news dates from repository.
- Seven original research-interest URLs retained. Footer preserves “Convince future generations, not just peers.”; publication section preserves “My research is my brand; papers are my products.”
- All images loaded; desktop and 375px mobile document have no horizontal overflow. Original SAM dialog opens and closes successfully. Browser console returned old extension metadata errors, unrelated to homepage code.
- Remaining minor difference: browser font metrics are not pixel-identical to the generated reference. No blocking visual issues.
- Production Jekyll build remains unverified; preview is running, no deployment performed.

## Prominent personal statement and coordinated SAM — final result: passed
- Moved “Convince future generations, not just peers.” from the footer to the hero tagline, replacing the generic learning/training tagline. The research/product motto stays below Selected research.
- Desktop portrait is 188×200px (75.2% of prior 250px width), centered in a reduced 240px right column with a 24px gap. Biography occupies the recovered space. Tablet portrait similarly reduced to 158px; mobile statement spans the full content width.
- Generated a new qualitative SAM thumbnail using the original paper figure for meaning and the approved merge/DICE images for palette. All four local GPU/data nodes, communication, and schematic SAM perturbation/update remain visible; the exact original figure is still available through the existing dialog.
- Desktop image loading and layout checked; all assets loaded. Mobile document 375px has no horizontal overflow. Screenshot inspected for caption wrapping and profile balance.
- Full production Jekyll build remains unverified; no deployment performed.

## Research motto typography — passed
Raised the publication motto from 15px to 19px on desktop, and 14px to 17px on mobile, with slight margin adjustments. Desktop screenshot confirms the motto remains subordinate to the 46px section title and more prominent than body text. Mobile wraps naturally; no horizontal overflow on either viewport.

## Local deployment feedback — final result: passed
- Replaced the three 224px reference crops with new 1672px-wide editorial illustrations. Single merge now shows sparse gossip paths followed by one final parameter average. DICE and topology retain pastel network imagery. Topology uses a topic caption rather than assigning individual nodes unsupported generalization ratings.
- All four image slots measure exactly 200×112.5 CSS pixels on desktop and mobile. Removed View original figure text and its padding; SAM still opens the exact original figure by clicking the thumbnail.
- Restored all authors from the preserved complete lists, bolding the first author (Tongtian Zhu) in every row. No clipped/ellipsized names; mobile lists wrap normally.
- Both personal statements share 18px desktop / 16px mobile styling. Removed hero eyebrow and shortened research bio to the requested one sentence.
- Desktop screenshot and mobile publication view inspected. No horizontal overflow; all images loaded at their high source resolution. SAM dialog verified open and close.
- Existing local deployment users receive a delta patch against raiden-homepage-vscode.zip, with only two edited text files and three added image files.
- Production Jekyll build remains unverified in this runtime; no remote push performed.

## Venue badge preview — final result: passed
- Added real HTML venue badges to the four thumbnails: ICLR 2026 (Oral), ICLR 2025, ICML 2023, ICML 2022 (Spotlight).
- Muted purple #715881 with white text; aligned left and straddling the top edge. Badge does not change the 200×112.5px image size or replace the approved high-resolution illustration.
- Verified desktop Selected research screenshot and mobile publication screenshot: badges fit, image labels remain readable, full authors retained, no horizontal overflow. Both statements remain 18px desktop / 16px mobile; short biography and removed hero eyebrow retained.
- Preview remains open at Selected research. User requested preview only: no ZIP generation and no deployment.

## Heading scale and integrated backgrounds — passed
- Desktop name reduced 62→56px and Selected research 46→40px; tablet name 46px, mobile name 36px and section heading 29px.
- Applied a mild CSS brightness normalization (1.075) and multiply compositing to the four thumbnail images so their near-white grounds blend with the ivory page. Source image files and illustration contents are unchanged; no regeneration. Displayed light tones are mildly lifted by the compositing treatment.
- Verified desktop rendering with preserved venue badges, dimensions 200×112.5px, and no overflow. New complete screenshot supplied; no ZIP generated.

## 2026-09-09 — Research, Writing and Talks archives
Status: implementation complete; browser verification partial (security-policy block).

- Approved homepage vs All publications compared side-by-side at desktop scale:
  shared ivory background, serif hierarchy, lavender accents, compact separators,
  200 × 112.5 thumbnails, and edge-mounted venue badges match the reference.
- Eight bibliography entries, three real Writing/project entrances, eleven talk
  records. Four new ImageGen illustrations inspected. All first authors bold;
  source author names otherwise retained, with LSN updated from arXiv 2406.09189.
- Publications and Writing desktop screenshots captured; no broken images or
  horizontal overflow in observed desktop states. Research → Writing click passed.
- Every supported page rendered through preview code without remaining Liquid.
  Local asset existence and in-page anchors checked for all five routes.
- DICE and subsequent Talks browser interactions blocked by browser URL security
  policy. No bypass attempted. Their visual behavior and mobile views remain
  unverified. DICE formula markup statically preserved and MathJax configured;
  runtime formula rendering remains unverified. Full Jekyll build unavailable.
- Public GitHub repository untouched. Preview/export from previous turn is stale.

## Two user-selected additions — 2026-09-09
Status: passed for the publications additions.
- Added only Distributed Team Orchestration and the Decentralised Foundation Models chapter; archive now has 10 entries.
- DTOA: arXiv 2608.09256, six full authors, Preprint 2026.
- Chapter: Springer DOI 10.1007/978-3-031-95418-4_16, Fengxiang He / Lihao Nan / Tongtian Zhu; official citation year 2026, first online July 27, 2025. Chapter link verified against publisher record.
- New ImageGen assets are both 1672×941. Qualitative concepts: supervisor network + coordinated teams; shared peer resources + decentralised models. Pastel lavender/blue/sage/peach, near-white background, no empirical charts or equations. Files: team-orchestration-hd.webp and decentralised-foundation-hd.webp.
- Before/after archive screenshots compared side-by-side. Existing layout and CSS unchanged; all ten thumbnails measured 200×112.5 CSS pixels, all loaded, no desktop horizontal overflow. All first authors bold. Both new article links and 2022/2026 year navigation checked.
- Publications preview had stopped; restarted the same preview service after ERR_CONNECTION_REFUSED. No bypass of the previously blocked DICE/Talks URLs attempted.
- Ruby/Jekyll build and other page browser checks remain outside this scoped verification. No push or deployment.
