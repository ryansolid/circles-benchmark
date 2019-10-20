import { html, render } from 'lit-html';

function createBoxes(number) {
  const boxes = [];
  for (let i = 0; i < number; i++)
    boxes.push({ top: 0, left: 0, color: null, content: 0, count: 0 });
  return boxes;
}

function tick(box) {
  const count = box.count += 1;
  box.top = Math.sin(count / 10) * 10;
  box.left = Math.cos(count / 10) * 10;
  box.color = count % 255;
  box.content = count % 100;
  box.count = count;
}

const boxesTemplate = boxes =>
  boxes.map((box, i) =>
    html`<div class='box-view'>
      <div class='box' id='${i + 1}' style='
        top: ${box.top}px;
        left: ${box.left}px;
        background: rgb(0,0,${box.color});'>${box.content}</div>
    </div>`
  )

let grid, boxes;
Benchmark.Framework.LitHTML = {
  start() {
    boxes = createBoxes(Benchmark.number);
    render(boxesTemplate(boxes), grid = document.getElementById('grid'))
  },
  loop() {
    Promise.resolve().then(() => {
      boxes.forEach(tick);
      render(boxesTemplate(boxes), grid);
    });
  },
  cleanup() { render(null, grid); }
}
