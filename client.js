FRAMEWORKS = [
  {name: 'Backbone', version: '1.3.3'},
  {name: 'Knockout', version: '3.4.2'},
  {name: 'React', version: '16.7.0'},
  {name: 'Solid', version: '0.3.6'},
  {name: 'Surplus', version: '0.5.3'},
  {name: 'Vanilla', version: ''}
];

Benchmark = {
  number: 300,
  Framework: {}
};

(function() {
  const buttons = document.getElementById('buttons');
  const timing = document.getElementById('timing');
  const grid = document.getElementById('grid');
  const running = document.getElementById('running');

  let timer, loopTime, loopCount, totalTime, currentLoop, currentImpl;
  function benchLoop() {
    let lastLoopTime = loopTime || performance.now();
    loopTime = performance.now();
    loopCount++;
    currentLoop();
    totalTime = totalTime + loopTime - lastLoopTime;
    if(loopCount % 30 === 0)
      timing.textContent = `Performed ${loopCount} iterations in ${totalTime.toFixed(2)} ms (average ${(totalTime / loopCount).toFixed(2)} ms per loop).`;
    timer = setTimeout(benchLoop, 0);
  }

  function stop() {
    timer && clearTimeout(timer);
    currentImpl && currentImpl.cleanup && currentImpl.cleanup();
    running.textContent = 'None';
    grid.textContent = '';
  }

  FRAMEWORKS.forEach(framework => {
    const script = document.createElement('script');
    script.src = `dist/${framework.name.toLowerCase()}.js`;
    script.type = 'text/javascript'
    document.head.appendChild(script);

    const button = document.createElement('button');
    button.textContent = `${framework.name} ${framework.version}`;
    button.onclick = () => {
      stop();
      loopTime = loopCount = totalTime = 0;
      let impl;
      if (impl = Benchmark.Framework[framework.name]) {
        currentImpl = impl;
        running.textContent = framework.name;
        impl.start();
        currentLoop = impl.loop;
        benchLoop();
      }
    }
    buttons.appendChild(button);
  })

  const button = document.createElement('button');
  button.textContent = 'Stop Benchmark';
  button.onclick = () => stop();
  buttons.appendChild(button);
})();
