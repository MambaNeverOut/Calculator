import $ from "jquery";
import "./style.css";
import Model from './base/Model.js';
import View from './base/View.js'

const eventBus = $(window);
const m = new Model({
  data: {
    formula: localStorage.getItem("formula") || "",
    result: localStorage.getItem("result") || ""
  },
  update(data) {
    Object.assign(m.data, data);
    eventBus.trigger("m:updated");
    localStorage.setItem("formula", m.data.formula);
    localStorage.setItem("result", m.data.result);
  },
})

const view = {
  el: null,
  html: `
  <div class="calculation">
    <div class="view">
      <div class="process">{{formula}}</div>
      <div class="result">{{result}}</div>
    </div>
    <div class="keyboard">
      <div class="number">
      <ul>
          <li id="clear">C</li>
          <li id="remove">
            <svg class="icon">
              <use xlink:href="#icon-remove"></use>
            </svg>
          </li>
          <li id="square">x²</li>
          <li id="add">+</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li id="minus">-</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li id="mul">*</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li id="div">/</li>
          <li id="remainder">%</li>
          <li>0</li>
          <li id="point">.</li>
          <li id="getResult">=</li>
        </ul>
      </div>
    </div>
  </div>
  `,
  init(container) {
    view.el = $(container);
    view.render(m.data);
    view.autoBindEvents();
    eventBus.on("m:updated", () => {
      view.render(m.data);
      view.autoBindEvents();
    });
  },
  render(data) {
    if (view.el.children.length !== 0) view.el.empty();
    $(
      view.html
      .replace("{{formula}}", data.formula)
      .replace("{{result}}", data.result)
    ).appendTo(view.el);
  },
  events: {
    add: "add", // +
    minus: "minus", // -
    mul: "mul", // x
    div: "div", // /
    square: "square", // 平方
    remainder: "remainder", // %
    point: "point",
    getResult: "getResult",
    remove: "remove",
    clear: "clear"
  },
  add(item) {
    m.update({
      formula: (m.data.formula += item.innerText),
      result: m.data.result + item.innerText
    });
  },
  minus(item) {
    m.update({
      formula: (m.data.formula += item.innerText),
      result: m.data.result + item.innerText
    });
  },
  mul(item) {
    m.update({
      formula: (m.data.formula += item.innerText),
      result: m.data.result + item.innerText
    });
  },
  div(item) {
    m.update({
      formula: (m.data.formula += item.innerText),
      result: m.data.result + item.innerText
    });
  },
  square(item) {
    m.update({
      formula: (m.data.formula += item.innerText),
      result: Math.pow(m.data.result, 2)
    });
  },
  clear() {
    m.update({
      formula: "",
      result: ""
    });
  },
  remainder(item) {
    m.update({
      formula: (m.data.formula += item.innerText),
      result: m.data.result + item.innerText
    });
  },
  remove() {
    m.update({
      formula: m.data.formula.slice(0, -1),
      result: m.data.result
    });
  },
  point(item) {
    if (m.data.result.toString().indexOf(".") === -1) {
      m.update({
        formula: (m.data.formula += item.innerText),
        result: m.data.result + item.innerText
      });
    } else {
      m.update({
        formula: (m.data.formula += item.innerText),
        result: m.data.result
      });
    }
  },
  getResult(item) {
    m.update({
      formula: m.data.formula,
      result: eval(m.data.formula)
    });
  },
  autoBindEvents() {
    const $liList = Array.from($(".number ul").find("li"));
    $liList.forEach((item, index) => {
      $(item).on("click", e => {
        for (let key in view.events) {
          if (e.currentTarget.id === key) {
            // 如果点击的元素的id在events中找到了，则调用对应的函数
            view[view.events[key]](item);
            return;
          }
        }
        m.update({
          formula: (m.data.formula += item.innerText),
          result: eval(m.data.formula)
        });
      });
    });
  }
};

view.init("#app");