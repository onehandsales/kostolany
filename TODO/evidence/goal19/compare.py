from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[3];out=Path(__file__).parent
pairs=[('signin','Logging in','02_sc_e4d414380a1047a2b7970cf7869a0866'),('signup','Logging in','01_sc_d55739aa2ac1495da026006235e7c0a7'),('logout','Profile/Settings/Logging out','02_sc_2d1afd7a02a347868564f9757753d077')]
html='<!doctype html><meta charset="utf-8"><title>Goal 19 comparison</title><style>body{font:16px sans-serif;background:#eee}section{display:flex;gap:20px}img{width:393px}figure{margin:0}p{max-width:900px}</style><h1>Goal 19: original / implementation</h1><p>Reference: 1179×2556 normalized to393×852, OS top59/bottom34 cropped. Implementation: actual393×759 browser capture. Cropping does not establish device DPR. The logout dialog is compared separately from its background (profile now, original Settings); Goal20 connects Settings. Mock controls are explicit additions. Font, icons, inaccessible source content and mock menu behavior remain different; no100%claim.</p>'
for name,flow,id in pairs:
 source=root/'medium/flows'/flow/'screens'/f'{id}.png'
 ref=Image.open(source).resize((393,852)).crop((0,59,393,818));ref.save(out/f'{name}-reference.png')
 combo=Image.new('RGB',(806,759),'#ddd');combo.paste(ref,(0,0));combo.paste(Image.open(out/f'{name}.png'),(413,0));combo.save(out/f'{name}-comparison.png')
 html+=f'<h2>{name}</h2><p>{flow} / {id}</p><section><figure><figcaption>Reference — derived crop</figcaption><img src="{name}-reference.png"></figure><figure><figcaption>Actual implementation</figcaption><img src="{name}.png"></figure></section>'
(out/'COMPARISON.html').write_text(html)
