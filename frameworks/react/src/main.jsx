import React, {Component} from 'react';
import ReactDOM from 'react-dom'

function createBoxes(number) {
  const boxes = [];
  for (let i = 0; i < number; i++)
    boxes.push({ top: 0, left: 0, color: null, content: 0, count: 0 });
  return boxes;
}

function tick(box) {
  const count = box.count + 1
  return {
    top: Math.sin(count / 10) * 10,
    left: Math.cos(count / 10) * 10,
    color: count % 255,
    content: count % 100,
    count: count
  }
}

class Main extends Component {
  constructor() {
    super(...arguments);
    this.state = { boxes: createBoxes(Benchmark.number) };
    Benchmark.Framework.React.loop = () =>
    Promise.resolve().then(() => this.setState({boxes: this.state.boxes.map(tick)}))
  }

  render() {
    return this.state.boxes.map((box, i) =>
      <div className="box-view" key={i}>
        <div className="box" id={i} style={{
          top: `${box.top}px`,
          left: `${box.left}px`,
          background: `rgb(0,0,${box.color})`}}
        >{box.content}</div>
      </div>
    );
  }
}

Benchmark.Framework.React = {
  start() { ReactDOM.render(<Main />, document.getElementById('grid')); },
  cleanup() { ReactDOM.unmountComponentAtNode(document.getElementById('grid')); }
}