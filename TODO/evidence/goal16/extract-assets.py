from pathlib import Path
from PIL import Image
import json
root=Path(__file__).resolve().parents[3]
assets=root/'FE/assets/medium'
items=[
 ('chimichurri','Library/List detail/03_sc_0b1e7b64b9f14f2cb5358161e0f67a94',(867,981,1107,1149)),
 ('challenged','Library/List detail/03_sc_0b1e7b64b9f14f2cb5358161e0f67a94',(72,885,144,957)),
 ('mind-flower','Library/List detail/04_sc_e20e59ee459b4a0d9a0a0302091962bd',(867,462,1107,630)),
 ('mind-logo','Library/List detail/04_sc_e20e59ee459b4a0d9a0a0302091962bd',(72,367,144,439)),
 ('horse','Library/List detail/04_sc_e20e59ee459b4a0d9a0a0302091962bd',(867,1131,1107,1299)),
 ('caroline','Library/List detail/04_sc_e20e59ee459b4a0d9a0a0302091962bd',(72,1035,144,1107)),
 ('sunset','Library/List detail/04_sc_e20e59ee459b4a0d9a0a0302091962bd',(867,1800,1107,1968)),
 ('know-thyself','Library/List detail/04_sc_e20e59ee459b4a0d9a0a0302091962bd',(72,1704,144,1776)),
 ('bernie','Home/Story detail/05_sc_e1a92b59829c4678b3362d2dc6abae59',(72,845,168,941)),
 ('alfred','Home/Story detail/05_sc_e1a92b59829c4678b3362d2dc6abae59',(72,2105,168,2201)),
 ('prompt-bible','Home/Story detail/07_sc_92624aea551d44a7bbcf71d7d78aff4c',(72,430,1107,949)),
 ('gemini','Home/Story detail/07_sc_92624aea551d44a7bbcf71d7d78aff4c',(72,1635,1107,2154)),
 ('love','Home/01_sc_5e0ba0e498ff49579bf838096aec4b5e',(867,773,1107,933)),
 ('evening','Home/01_sc_5e0ba0e498ff49579bf838096aec4b5e',(867,1516,1107,1676)),
 ('kris','Home/01_sc_5e0ba0e498ff49579bf838096aec4b5e',(72,662,132,722)),
 ('advice','Home/01_sc_5e0ba0e498ff49579bf838096aec4b5e',(72,1404,132,1464)),
 ('jeremiah','Home/01_sc_5e0ba0e498ff49579bf838096aec4b5e',(72,2224,132,2284)),
 ('brain','Home/Story detail/02_sc_332d5b0923e546fcbf6a8fc613cda6a4',(72,1269,1107,1959)),
 ('jordan','Home/Story detail/02_sc_332d5b0923e546fcbf6a8fc613cda6a4',(72,1077,168,1173)),
 ('ide','Home/02_sc_1ef4e2f769774d2c958fcb38b96dc94f',(867,1258,1107,1418)),
 ('coding','Home/02_sc_1ef4e2f769774d2c958fcb38b96dc94f',(72,1146,132,1206)),
 ('trauma','Explore/Searching Medium/03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f',(867,649,1107,809)),
 ('awareness','Explore/Searching Medium/03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f',(867,1331,1107,1491)),
 ('vinyl','Explore/Searching Medium/03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f',(867,2042,1107,2202)),
 ('mitch','Explore/Searching Medium/03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f',(72,537,132,597)),
 ('lalithaa','Explore/Searching Medium/03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f',(72,1219,132,1279)),
 ('ironkeel','Explore/Searching Medium/03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f',(72,1962,132,2022)),
 ('ux','Explore/02_sc_1c3e4349171248378eada528f7942269',(138,1001,198,1061)),
 ('thomas','Explore/02_sc_1c3e4349171248378eada528f7942269',(138,1431,198,1491)),
 ('scott','Explore/02_sc_1c3e4349171248378eada528f7942269',(138,1799,198,1859)),
 ('eh','Explore/02_sc_1c3e4349171248378eada528f7942269',(138,2167,198,2227)),
 ('curious','Home/04_sc_4ec0a8b65f954b0984ece5b3b9f258e4',(867,773,1107,933)),
 ('forgiven','Home/04_sc_4ec0a8b65f954b0984ece5b3b9f258e4',(867,1516,1107,1676)),
 ('thinkers','Home/04_sc_4ec0a8b65f954b0984ece5b3b9f258e4',(72,662,132,722)),
 ('podcast','Explore/04_sc_4352273aa0654f939705613dfa224e75',(72,525,888,1017)),
 ('staff-fragment','Explore/04_sc_4352273aa0654f939705613dfa224e75',(960,525,1179,1017)),
 ('colin','Explore/04_sc_4352273aa0654f939705613dfa224e75',(72,1053,132,1113)),
 ('wilson','Explore/04_sc_4352273aa0654f939705613dfa224e75',(72,1779,132,1839)),
 ('ronan','Explore/04_sc_4352273aa0654f939705613dfa224e75',(72,2179,132,2239)),
 ('mcp','Explore/05_sc_6bc604f45031400d9cebd252cd89e7a2',(72,1,132,61)),
 ('obsidian','Explore/05_sc_6bc604f45031400d9cebd252cd89e7a2',(72,432,132,492)),
 ('iris','Explore/05_sc_6bc604f45031400d9cebd252cd89e7a2',(144,1173,336,1365)),
 ('coinmonks','Explore/05_sc_6bc604f45031400d9cebd252cd89e7a2',(904,1173,1096,1365)),
 ('daily-dollar','Explore/06_sc_dfdd5f6377a848c59b3512417cb47490',(93,1173,285,1365)),
 ('alex-mathers','Explore/06_sc_dfdd5f6377a848c59b3512417cb47490',(847,1173,1039,1365)),
]
manifest=[]
for name,path,box in items:
 flow,file=path.rsplit('/',1);source=Path('medium/flows')/flow/'screens'/f'{file}.png'
 Image.open(root/source).crop(box).save(assets/f'{name}.png')
 manifest.append({'asset':f'FE/assets/medium/{name}.png','source':str(source),'cropPhysicalPixels':box})
(assets/'SOURCES.json').write_text(json.dumps(manifest,indent=2))
