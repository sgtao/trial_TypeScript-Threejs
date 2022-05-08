document.addEventListener('DOMContentLoaded', function () {
  const main = new Main();
});
class Main {
  constructor() {
    this.btn_page_top = document.querySelector('#page_top');
    this._init();
  }
  _init() {
    init_page_top(this.btn_page_top);
  }
}