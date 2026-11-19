from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[3];out=Path(__file__).parent
pairs=[('article-top','Home/Story detail','02_sc_332d5b0923e546fcbf6a8fc613cda6a4'),('save-sheet','Home/Story detail/Saving a story','02_sc_31edfd53d2874259a6ed5ecbc756d10b'),('responses','Home/Story detail','05_sc_e1a92b59829c4678b3362d2dc6abae59'),('more-from','Home/Story detail','07_sc_92624aea551d44a7bbcf71d7d78aff4c')]
html='<!doctype html><meta charset="utf-8"><title>Goal 17 comparison</title><style>body{font:16px sans-serif;background:#eee}section{display:flex;gap:20px}img{width:393px}figure{margin:0}p{max-width:900px}</style><h1>Goal 17: original / implementation</h1><p>Reference: 1179×2556 normalized to393×852, OS top59/bottom34 cropped. Implementation: actual393×759 browser capture. Cropping does not establish device DPR. Article footer headings aligned; active browser header differs from collapsed reference header. Font, icons, inaccessible source content and mock menu behavior remain different; no100%claim.</p>'
for name,flow,id in pairs:
 source=root/'medium/flows'/flow/'screens'/f'{id}.png'
 ref=Image.open(source).resize((393,852)).crop((0,59,393,818));ref.save(out/f'{name}-reference.png')
 combo=Image.new('RGB',(806,759),'#ddd');combo.paste(ref,(0,0));combo.paste(Image.open(out/f'{name}.png'),(413,0));combo.save(out/f'{name}-comparison.png')
 html+=f'<h2>{name}</h2><p>{flow} / {id}</p><section><figure><figcaption>Reference — derived crop</figcaption><img src="{name}-reference.png"></figure><figure><figcaption>Actual implementation</figcaption><img src="{name}.png"></figure></section>'
(out/'COMPARISON.html').write_text(html)
