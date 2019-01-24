
import * as Surplus from 'surplus'
import S from 's-js'

function createBoxes(number) {
  const boxes = [];
  for (let i = 0; i < number; i++)
    boxes.push({
      top: S.data(0),
      left: S.data(0),
      content: S.data(0),
      color: S.data(),
      count: 0
    });
  return boxes;
}

function tick(box) {
  const count = ++box.count;
  box.top(Math.sin(count / 10) * 10)
  box.left(Math.cos(count / 10) * 10)
  box.color(count % 255)
  box.content(count % 100)
}

const Main = () => {
  const boxes = createBoxes(Benchmark.number);
  Benchmark.Framework.Surplus.loop = () =>
    Promise.resolve().then(() => S.freeze(() => boxes.forEach(tick)));

  return boxes.map((box, index) =>
    <div class="box-view">
      <div class="box" id={index}
        style={{
          top: `${box.top()}px`,
          left: `${box.left()}px`,
          background: `rgb(0,0,${box.color()})`
        }}
      >{box.content()}</div>
    </div>
  )
}

let dispose;
Benchmark.Framework.Surplus = {
  start() {
    S.root(disposer => {
      dispose = disposer;
      const grid = document.getElementById('grid');
      Main().forEach(row => grid.appendChild(row));
    });
  },
  cleanup() { dispose && dispose(); }
}