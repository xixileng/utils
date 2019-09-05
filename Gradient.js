const WIDTH = 1000;
const HEIGHT = 10;

class Gradient {
  _ctx = null;
  _colors = [];
  _gradients = [];

  constructor(gradients) {
    if (!Array.isArray(gradients)) {
      throw new Error(
        `constructor param must be Array, current param is ${gradients}`,
      );
    }
    if (gradients.length < 2) {
      throw new Error(
        `length of constructor param must >= 2, current length is ${
          gradients.length
        }`,
      );
    }
    this._gradients = gradients;
    this._init();
  }
  _init() {
    this._initContext();
    this._drawGradient();
    this._getColors();
  }
  _initContext() {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', WIDTH);
    canvas.setAttribute('height', HEIGHT);
    this._ctx = canvas.getContext('2d');
  }
  _drawGradient() {
    const { _ctx, _gradients } = this;
    const gradient = _ctx.createLinearGradient(
      0,
      HEIGHT / 2,
      WIDTH,
      HEIGHT / 2,
    );
    const per = 1 / (_gradients.length - 1);
    for (let i = 0; i < _gradients.length; i++) {
      gradient.addColorStop(i * per, _gradients[i]);
    }
    _ctx.fillStyle = gradient;
    _ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }
  _getColors() {
    const { _ctx } = this;
    const imageData = _ctx.getImageData(0, HEIGHT / 2, WIDTH, 1).data;
    for (let i = 0; i < imageData.length; i += 4) {
      this._colors.push([
        imageData[i],
        imageData[i + 1],
        imageData[i + 2],
        imageData[i + 3],
      ]);
    }
  }
  getColor(index) {
    // index 为百分制的索引值
    if (index < 0 || index > 100) {
      console.warn(
        `getColor param should >= 0 and <= 100, current param is ${index}`,
      );
      if (index < 0) index = 0;
      if (index > 100) index = 100;
    }
    const i = Math.round(index * 10);
    const [r, g, b, a] = this._colors[i];
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
}

export default Gradient;
