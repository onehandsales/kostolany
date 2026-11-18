"""Create labeled six-screen contact sheets for visual review; originals stay intact."""
import json
from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parent.parent
catalog = json.loads((root / '_research/catalog.json').read_text(encoding='utf-8'))
dest = root / '_research/review-sheets'
dest.mkdir(exist_ok=True)
for start in range(0, len(catalog['screens']), 6):
    batch = catalog['screens'][start:start + 6]
    sheet = Image.new('RGB', (1170, 1748), '#dddddd')
    draw = ImageDraw.Draw(sheet)
    for slot, item in enumerate(batch):
        x, y = (slot % 3) * 390, (slot // 3) * 874
        draw.text((x + 8, y + 6), f"{item['index']:03d}  {item['id']}", fill='black')
        with Image.open(root / 'screens' / (item['id'] + '.png')) as original:
            sheet.paste(original.resize((390, 844), Image.Resampling.LANCZOS), (x, y + 30))
    sheet.save(dest / f'{start + 1:03d}-{start + len(batch):03d}.png')
print(f'{len(list(dest.glob("*.png")))} review sheets created')
