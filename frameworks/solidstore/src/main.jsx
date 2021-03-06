import { createStore } from "solid-js/store";
import { render } from "solid-js/web";

function createBoxes(number) {
  const boxes = [];
  for (let i = 0; i < number; i++)
    boxes.push({ top: 0, left: 0, color: null, content: 0, count: 0 });
  return boxes;
}

function tick(box) {
  const count = box.count + 1;
  return {
    top: Math.sin(count / 10) * 10,
    left: Math.cos(count / 10) * 10,
    color: count % 255,
    content: count % 100,
    count
  };
}

const ALL = {}
// More comparable to React
const Main = () => {
  const [state, setState] = createStore({
    boxes: createBoxes(Benchmark.number)
  });
  Benchmark.Framework.SolidState.loop = () =>
    Promise.resolve().then(() => setState("boxes", ALL, tick));

  return state.boxes.map((box, index) => (
    <div class="box-view">
      <div
        class="box"
        id={index}
        style={{
          top: `${box.top}px`,
          left: `${box.left}px`,
          background: `rgb(0,0,${box.color})`
        }}
        textContent={box.content}
      />
    </div>
  ));
};

let dispose;
Benchmark.Framework.SolidState = {
  start() {
    dispose = render(Main, document.getElementById("grid"));
  },
  cleanup() {
    dispose && dispose();
  }
};
