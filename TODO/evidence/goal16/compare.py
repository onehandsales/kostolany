from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[3];out=Path(__file__).parent
pairs=[('home','Home','01_sc_5e0ba0e498ff49579bf838096aec4b5e'),('featured','Home','04_sc_4ec0a8b65f954b0984ece5b3b9f258e4'),('featured-empty','Home','03_sc_e1cf4be8210f432098943d8a233d9d72'),('explore','Explore','02_sc_1c3e4349171248378eada528f7942269'),('topics','Explore/Searching Medium','02_sc_047c91d900aa47448d61e4faacd68ad5'),('search','Explore/Searching Medium','03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f'),('staff-picks','Explore','04_sc_4352273aa0654f939705613dfa224e75'),('who-to-follow','Explore','05_sc_6bc604f45031400d9cebd252cd89e7a2')]
html='<!doctype html><meta charset="utf-8"><title>Goal 16 comparison</title><style>body{font:16px sans-serif;background:#eee}section{display:flex;gap:20px}img{width:393px}figure{margin:0}p{max-width:900px}</style><h1>Goal 16: original / implementation</h1><p>Reference: 1179×2556 normalized to393×852, OS top59/bottom34 cropped. Implementation: actual393×759 browser capture. Cropping does not establish device DPR. Staff Picks and Who to follow headings aligned to their reference scroll positions. Font, icons, inaccessible source content and mock menu behavior remain different; no100%claim.</p>'
for name,flow,id in pairs:
 source=root/'medium/flows'/flow/'screens'/f'{id}.png'
 ref=Image.open(source).resize((393,852)).crop((0,59,393,818));ref.save(out/f'{name}-reference.png')
 combo=Image.new('RGB',(806,759),'#ddd');combo.paste(ref,(0,0));combo.paste(Image.open(out/f'{name}.png'),(413,0));combo.save(out/f'{name}-comparison.png')
 html+=f'<h2>{name}</h2><p>{flow} / {id}</p><section><figure><figcaption>Reference — derived crop</figcaption><img src="{name}-reference.png"></figure><figure><figcaption>Actual implementation</figcaption><img src="{name}.png"></figure></section>'
(out/'COMPARISON.html').write_text(html)
