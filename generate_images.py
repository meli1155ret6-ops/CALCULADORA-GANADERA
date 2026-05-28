from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('img', exist_ok=True)
font = None
try:
    font = ImageFont.truetype('arial.ttf', 48)
except Exception:
    font = ImageFont.load_default()

for name, text, color in [
    ('cerdo', 'Cerdo', (255, 204, 188)),
    ('vaca', 'Vaca', (227, 242, 253)),
    ('gallina', 'Gallina', (255, 249, 196)),
]:
    img = Image.new('RGB', (800, 500), color)
    draw = ImageDraw.Draw(img)
    try:
        bbox = draw.textbbox((0, 0), text, font=font)
        w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    except AttributeError:
        mask = font.getmask(text)
        w, h = mask.size
    draw.text(((800-w)/2, (500-h)/2), text, fill='black', font=font)
    img.save(os.path.join('img', f'{name}.png'))

print('created png images')
