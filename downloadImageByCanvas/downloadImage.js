function downloadImage (img, opts = {}) {
  const { width, height, name = '下载.png', format = 'image/png' } = opts;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.height;
  if (width) {
    canvas.width = img.width = width;
  }
  if (height) {
    canvas.height = img.height = height;
  }
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const imgUrl = canvas.toDataURL(format);

  const link = document.createElement('a');
  link.href = imgUrl;
  link.download = name;

  const clickEvent = document.createEvent('MouseEvents');
  clickEvent.initEvent('click', true, false);
  link.dispatchEvent(clickEvent);
}

export default downloadImage;
