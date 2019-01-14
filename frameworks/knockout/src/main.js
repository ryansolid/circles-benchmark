import ko from 'knockout';
ko.options.deferUpdates = true;

function createBoxes(number) {
  const boxes = [];
  for (let i = 0; i < number; i++)
    boxes.push({
      top: ko.observable(0),
      left: ko.observable(0),
      content: ko.observable(0),
      count: ko.observable(0),
      color: ko.observable()
    });
  return boxes;
}

function tick(box) {
  const count = box.count() + 1
  box.top(Math.sin(count / 10) * 10)
  box.left(Math.cos(count / 10) * 10)
  box.color(count % 255)
  box.content(count % 100)
  box.count(count)
}

const Main = (element) => {
  const boxes = createBoxes(Benchmark.number);
  Benchmark.Framework.Knockout.loop = () => Promise.resolve().then(() => boxes.forEach(tick));

  element.innerHTML = `
    <!-- ko foreach: boxes -->
    <div class="box-view">
      <div class="box" data-bind="attr: {id: $index()}, text: content(), style: {top: top() + 'px', left: left() + 'px', background: 'rgb(0,0,' + color() + ')'}"></div>
    </div>
    <!-- /ko -->
  `
  return { boxes };
}

const grid = document.getElementById('grid');
Benchmark.Framework.Knockout = {
  start() {
    ko.applyBindings(Main(grid), grid);
  },
  cleanup() { ko.cleanNode(grid); }
}