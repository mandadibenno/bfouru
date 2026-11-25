// contact sheet: node sheet.js out.jpg tileH file1 file2 ...
const sharp = require('sharp');
const [out, th, ...files] = process.argv.slice(2);
(async () => {
  const H = +th; const tiles = []; let x = 10, y = 10, rowH = 0; const W = 2400;
  for (const f of files) { const b = await sharp(f).resize({ height: H }).toBuffer(); const m = await sharp(b).metadata(); if (x + m.width > W - 10) { x = 10; y += rowH + 10; rowH = 0; } tiles.push({ input: b, left: x, top: y }); x += m.width + 10; rowH = Math.max(rowH, m.height); }
  await sharp({ create: { width: W, height: y + rowH + 10, channels: 3, background: '#7a7a7a' } }).composite(tiles).jpeg({ quality: 82 }).toFile(out);
})();
