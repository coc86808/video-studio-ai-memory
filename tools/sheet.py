"""Make a contact sheet of stills so you can check many frames at once.
Usage: python tools/sheet.py <projectDir>   -> <projectDir>/stills/sheet_N.jpg"""
import sys, glob, os
from PIL import Image
d = os.path.join(sys.argv[1], 'stills')
fs = sorted(glob.glob(os.path.join(d, 'f_*.jpg')), key=lambda f: float(os.path.basename(f)[2:-4]))
W, H = 640, 360
for p in range(0, len(fs), 12):
    ch = fs[p:p+12]; s = Image.new('RGB', (W*3, H*((len(ch)+2)//3)), 'white')
    for i, f in enumerate(ch): s.paste(Image.open(f).resize((W-4, H-4)), ((i % 3)*W, (i//3)*H))
    s.save(os.path.join(d, f'sheet_{p//12}.jpg'), quality=85); print(os.path.join(d, f'sheet_{p//12}.jpg'))
