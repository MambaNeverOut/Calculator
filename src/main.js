import $ from "jquery";
import "./style.css";

const eventBus = $(window);
const m = {
  data: {
    // result: parseInt(localStorage.getItem("result")) || 0,
    formula: localStorage.getItem("formula") || "",
    result: localStorage.getItem("result") || ""
    // formula: localStorage.getItem("formula") || 0
  },
  update(data) {
    Object.assign(m.data, data);
    eventBus.trigger("m:updated");
    localStorage.setItem("formula", m.data.formula);
    localStorage.setItem("result", m.data.result);
  }
};

const v = {
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
    v.el = $(container);
  },
  render(data) {
    if (v.el.children.length !== 0) v.el.empty();
    $(
      v.html
        .replace("{{formula}}", data.formula)
        .replace("{{result}}", data.result)
    ).appendTo(v.el);
  }
};

const c = {
  init(container) {
    v.init(container);
    v.render(m.data);
    c.autoBindEvents();
    eventBus.on("m:updated", () => {
      v.render(m.data);
      c.autoBindEvents();
    });
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
    console.log(m.data.result);
    console.log(m.data.formula);
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
        for (let key in c.events) {
          if (e.currentTarget.id === key) {
            // 如果点击的元素的id在events中找到了，则调用对应的函数
            console.log(item.innerText);
            c[c.events[key]](item);
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

c.init("#app");
