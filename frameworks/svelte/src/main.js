import Main from './main.svelte';

Benchmark.Framework.Svelte = {
  start() {
    new Main({
      target: document.getElementById('grid')
    });
  },
  cleanup() { }
}