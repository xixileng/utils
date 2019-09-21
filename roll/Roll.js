// 内部函数不给外面调用
const INIT = Symbol('init');
const RESET = Symbol('reset');
const ROLL = Symbol('roll');

const wait = time => new Promise(resolve => setTimeout(resolve, time));

class Roll {
  _length = 0;
  _dataIndex = 0;
  _timer = null;
  _lastTime = 0;
  _body = null;
  _translateY = 0;
  _data = [];

  // 配置区
  el = window.document; // 因为使用 querySelector+class 获取 DOM，如果 document 中有多个同名列表，就会获取到不正确的 DOM，因此可以传入 el 限定范围
  duration = 1000; // 单次滚动动画持续时长
  interval = 2000; // 滚动间隔
  delay = 0; // 动画延迟开始时间
  threshold = 2; // 开启动画的数据长度阈值
  bodyClass = 'el-table__body'; // 滚动列表容器的类名
  rowClass = 'el-table__row'; // 滚动列表行的类名
  autoStart = true; // 是否设置数据后默认开启动画

  constructor (rollOptions = {}) {
    this[INIT](rollOptions);
  }

  [INIT] ({ ...args }) {
    Object.keys(args).forEach(key => {
      if (this.hasOwnProperty(key)) {
        this[key] = args[key];
      }
    });
    if (this.duration >= this.interval) {
      console.error('duration should less than interval: ', {
        duration: this.duration,
        interval: this.interval,
      });
      this.duration = this.interval - 10; // 如果动画时间大于间隔，则改为相对小于间隔的值
    }
    // @TODO 增加更多参数校验
  }

  async [RESET] () {
    this._body.style.transition = 'none';
    this._body.style.transform = 'translateY(0px)';
    this._data.splice(this._length, Number.MAX_SAFE_INTEGER);
    this._dataIndex = 0;
    await wait(0); // 低配 $nextTick，预防获取组件高度计算错误
    this._translateY = -this.el.querySelector(`.${ this.rowClass }`).offsetHeight;
    this._body.style.transition = `transform ${ this.duration / 1000 }s linear`;
  }

  [ROLL] () {
    if (Date.now() - this._lastTime < this.duration) return; // 避免动画频繁触发
    this._lastTime = Date.now();
    this._data.push(this._data[this._dataIndex++]);
    this._body.style.transform = `translateY(${ this._translateY }px)`;
    this._translateY -= this.el.querySelectorAll(`.${ this.rowClass }`)[
      this._dataIndex
    ].offsetHeight;
  }

  async start () {
    this.pause();
    this._length = this._data.length;
    if (this._length < this.threshold) {
      return;
    }

    this._body = this.el.querySelector(`.${ this.bodyClass }`);
    await this[RESET]();
    await wait(this.delay);
    this.play();
  }

  play () {
    this[ROLL]();
    this._timer = setInterval(async () => {
      this[ROLL]();
      if (this._dataIndex % this._length === 0) {
        await wait(this.duration); // 等待上一条动画结束再重置
        this[RESET]();
      }
    }, this.interval);
  }

  pause () {
    if (this._timer) {
      clearInterval(this._timer);
    }
  }

  dispose () {
    this.pause();
    this._body = null;
  }

  setEl (el) {
    if (el instanceof Element) {
      this.el = el;
    } else {
      console.error('el should be instance of Element: ', el);
    }
  }

  setData (data) {
    if (Array.isArray(data)) {
      // @TODO 大数据量优化
      this._data = data;
      if (this.autoStart) this.start();
    } else {
      throw new Error('data type should be Array: ', data);
    }
  }
}

export default Roll;
