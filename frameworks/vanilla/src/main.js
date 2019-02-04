function tick(box, el) {
  const count = ++box.count
  el.style.setProperty('top', `${Math.sin(count / 10) * 10}px`);
  el.style.setProperty('left', `${Math.cos(count / 10) * 10}px`);
  el.style.setProperty('background', `rgb(0,0,${count % 255})`);
  el.firstChild.data = count % 100;
}

function createBoxes(number) {
  const boxes = [];
  for (let i = 0; i < number; i++)
    boxes.push({ top: 0, left: 0, color: null, content: 0, count: 0 });
  return boxes;
}

const createRow = (box, i) => `<div class='box-view'><div class='box' id='${i + 1}'> </div></div>`

let grid, boxes;
Benchmark.Framework.Vanilla = {
  start() {
    boxes = createBoxes(Benchmark.number);
    grid = document.getElementById('grid');
    grid.innerHTML = (boxes.map(createRow)).join('');
  },
  loop() {
    Promise.resolve().then(() => {
      for(let i = 0, node = grid.firstChild; node; node = node.nextSibling, i++ )
        tick(boxes[i], node.firstChild)
    });
  }
}
