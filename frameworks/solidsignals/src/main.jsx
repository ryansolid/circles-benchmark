import { createSignal, freeze } from "solid-js";
import { render } from "solid-js/dom";

function createBoxes(number) {
  const boxes = [];
  for (let i = 0; i < number; i++) {
    const [top, setTop] = createSignal(0),
      [left, setLeft] = createSignal(0),
      [color, setColor] = createSignal(null),
      [content, setContent] = createSignal(0);
    boxes.push({
      top,
      left,
      color,
      content,
      setTop,
      setLeft,
      setColor,
      setContent,
      count: 0
    });
  }
  return boxes;
}

function tick(box) {
  const count = ++box.count;
  box.setTop(Math.sin(count / 10) * 10);
  box.setLeft(Math.cos(count / 10) * 10);
  box.setColor(count % 255);
  box.setContent(count % 100);
}

// More comparable to Knockout/Surplus
const Main = () => {
  const boxes = createBoxes(Benchmark.number);
  Benchmark.Framework.SolidSignals.loop = () =>
    Promise.resolve().then(() => freeze(() => boxes.forEach(tick)));

  return boxes.map((box, index) => (
    <div class="box-view">
      <div
        class="box"
        id={index}
        style={{
          top: `${box.top()}px`,
          left: `${box.left()}px`,
          background: `rgb(0,0,${box.color()})`
        }}
        textContent={box.content()}
      />
    </div>
  ));
};

let dispose;
Benchmark.Framework.SolidSignals = {
  start() {
    dispose = render(Main, document.getElementById("grid"));
  },
  cleanup() {
    dispose && dispose();
  }
};
