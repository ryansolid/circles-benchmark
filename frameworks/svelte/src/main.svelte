{#each boxes as box, index}
  <div class="box-view">
    <div class="box"
      id={index}
      style="top: {box.top}px;left: {box.left}px;background: rgb(0,0,{box.color});"
    >{box.content}</div>
  </div>
{/each}

<script>
  let boxes = createBoxes(Benchmark.number);

  function createBoxes(number) {
    const boxes = new Array(number);
    for (let i = 0; i < number; i++)
      boxes[i] = { top: 0, left: 0, color: null, content: 0, count: 0 };
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

  Benchmark.Framework.Svelte.loop = function() {
    Promise.resolve().then(() => {
      boxes.forEach(tick)
      boxes = boxes;
    });
  }
</script>