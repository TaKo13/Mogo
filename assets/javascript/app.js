let __svg__ = { path: '../images/svg/**/*.svg', nane: 'sprite.svg'};
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

require('../../templates/index.pug');
require('../stylesheets/main.styl');

/**
 * @param target {string}
 * @param duration {number}
*/
const smoothScrollToElement = (target, duration) => {
  let timeElapsed, timeStart;

  const START = window.scrollY;
  const DISTANCE = document.querySelector(target).getBoundingClientRect().top;
  let start = Date.now();
  let end = start + duration;

  const easing = function(start, end) {
    if (Date.now() <= start) {
      return 0;
    }
    if (Date.now() >= end) {
      return 1;
    }

    let x = (Date.now() - start) / (end - start);

    return x * x * (3 - 2 * x);
  };

  const loop = time => {
    timeElapsed = time - timeStart;

    window.scrollTo(0, START + DISTANCE * easing(start, end));
    timeElapsed--;

    if (timeElapsed < duration) {
      requestAnimationFrame(loop);
    }
  };

  requestAnimationFrame(time => {
    timeStart = time;
    loop(time);
  });
}

document.body.addEventListener("click", e => {
  e.stopPropagation();
  e.preventDefault();

  smoothScrollToElement(e.target.hash, 400);
});