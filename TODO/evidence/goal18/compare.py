from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[3];out=Path(__file__).parent
pairs=[('library-empty','Library','02_sc_84e0421de98041bbb014822fc05dd3fb'),('library-filled','Library','03_sc_57450c38bf994be18d95fcaf712c56ba'),('create-empty','Library/Creating a list','02_sc_675e3eda08504708979533659dacdcf6'),('create-filled','Library/Creating a list','03_sc_ca3b32e4373a40fc84405838671eab27'),('list-empty','Library/List detail','02_sc_967232cfb5f845839053e0d371d78911'),('list-filled','Library/List detail','03_sc_0b1e7b64b9f14f2cb5358161e0f67a94'),('list-menu','Library/List detail/Deleting a list','02_sc_71f31ac7803a47f89b2e76b6a9355a7c'),('delete','Library/List detail/Deleting a list','03_sc_a1562b1931fc4650a544861094934588'),('remove-menu','Library/List detail/Removing a story','01_sc_fa4e79f0bed747d698ae44e23f9223f9')]
html='<!doctype html><meta charset="utf-8"><title>Goal 18 comparison</title><style>body{font:16px sans-serif;background:#eee}section{display:flex;gap:20px}img{width:393px}figure{margin:0}p{max-width:900px}</style><h1>Goal 18: original / implementation</h1><p>Reference: 1179×2556 normalized to393×852, OS top59/bottom34 cropped. Implementation: actual393×759 browser capture. Cropping does not establish device DPR. List membership/count/profile are actual mock state; differing content and scroll positions are documented. Font, icons, inaccessible source content and mock menu behavior remain different; no100%claim.</p>'
for name,flow,id in pairs:
 source=root/'medium/flows'/flow/'screens'/f'{id}.png'
 ref=Image.open(source).resize((393,852)).crop((0,59,393,818));ref.save(out/f'{name}-reference.png')
 combo=Image.new('RGB',(806,759),'#ddd');combo.paste(ref,(0,0));combo.paste(Image.open(out/f'{name}.png'),(413,0));combo.save(out/f'{name}-comparison.png')
 html+=f'<h2>{name}</h2><p>{flow} / {id}</p><section><figure><figcaption>Reference — derived crop</figcaption><img src="{name}-reference.png"></figure><figure><figcaption>Actual implementation</figcaption><img src="{name}.png"></figure></section>'
(out/'COMPARISON.html').write_text(html)
