import ast,json,html
from pathlib import Path
from PIL import Image
out=Path(__file__).parent;root=out.parents[2];manifest=[]
page='<!doctype html><meta charset="utf-8"><title>Goal21 final comparison</title><style>body{font:16px sans-serif;background:#eee}section{display:flex;gap:20px}img{width:393px}figure{margin:0}p{max-width:960px}</style><h1>Goal21 final capture / reference comparison</h1><p>Reference1179×2556 normalized393×852, top59/bottom34 OS area cropped. Actual web393×759. Different fonts/icons, mock data and scroll positions remain. This is not an identical-device or100%pixel match claim.</p>'
for number in range(16,21):
 tree=ast.parse((out.parent/f'goal{number}'/'compare.py').read_text())
 pairs=next(ast.literal_eval(node.value) for node in tree.body if isinstance(node,ast.Assign) and any(isinstance(target,ast.Name) and target.id=='pairs' for target in node.targets))
 for name,flow,id in pairs:
  if number==17 and name=='save-sheet':name='save-selected'
  actual=out/f'screens{number}'/f'{name}.png';source=root/'medium/flows'/flow/'screens'/f'{id}.png'
  record={'goal':number,'screen':name,'source':str(source.relative_to(root)),'actual':str(actual.relative_to(root)),'captured':actual.exists()};manifest.append(record)
  if not actual.exists():continue
  ref=Image.open(source).resize((393,852)).crop((0,59,393,818));refPath=actual.with_name(name+'-reference.png');ref.save(refPath)
  combo=Image.new('RGB',(806,759),'#ddd');combo.paste(ref,(0,0));combo.paste(Image.open(actual),(413,0));combo.save(actual.with_name(name+'-comparison.png'))
  page+=f'<h2>Goal{number} / {name}</h2><p>{html.escape(flow)} / {id}</p><section><figure><figcaption>Reference (normalized)</figcaption><img src="{refPath.relative_to(out)}"></figure><figure><figcaption>Actual final UI</figcaption><img src="{actual.relative_to(out)}"></figure></section>'
(out/'COMPARISON.html').write_text(page)
(out/'comparison-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print('captured pairs',sum(row['captured'] for row in manifest),'planned pairs',len(manifest))
