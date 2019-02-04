import Backbone from 'backbone';
import 'backbone.nativeview';
import _ from 'underscore';

const Box = Backbone.Model.extend({
  defaults: {
    top: 0,
    left: 0,
    color: 0,
    content: 0
  },

  initialize() { this.count = 0; },

  tick() {
    const count = this.count += 1;
    this.set({
      top: Math.sin(count / 10) * 10,
      left: Math.cos(count / 10) * 10,
      color: (count) % 255,
      content: count % 100
    });
  }
});

const BoxView = Backbone.NativeView.extend({
  className: 'box-view',

  template: _.template(`<div class="box" id="box-<%= number %>" style="top: <%= top %>px; left: <%= left %>px; background: rgb(0,0,<%= color %>);"><%= content %></div>`),

  initialize() {
    this.model.bind('change', this.render, this);
  },

  render() {
    this.el.innerHTML = this.template(this.model.attributes);
    return this;
  }
});

let boxes;

Benchmark.Framework.Backbone = {
  start() {
    const grid = document.getElementById('grid');
    boxes = _.map(_.range(Benchmark.number), i => {
      const box = new Box({number: i});
      const view = new BoxView({model: box});
      grid.appendChild(view.render().el);
      return box;
    });
  },

  loop() {
    Promise.resolve().then(() => {
      for (var i = 0, l = boxes.length; i < l; i++) {
        boxes[i].tick();
      }
    })
  },

  cleanup() { boxes = null; }
}



