(function () {
  var carousel = document.getElementById('carousel');
  if (!carousel) return;

  var slides = Array.prototype.slice.call(carousel.querySelectorAll('.carousel-slide'));
  var dotsWrap = carousel.querySelector('.carousel-dots');
  var prevBtn = carousel.querySelector('.carousel-prev');
  var nextBtn = carousel.querySelector('.carousel-next');
  var current = slides.findIndex(function (s) { return s.classList.contains('is-active'); });
  if (current < 0) current = 0;

  var AUTOPLAY_MS = 4500;
  var timer = null;

  var dots = slides.map(function (_, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot' + (i === current ? ' is-active' : '');
    dot.setAttribute('aria-label', 'Ir a la foto ' + (i + 1));
    dot.addEventListener('click', function () {
      goTo(i);
      restart();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(index) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function start() {
    timer = setInterval(next, AUTOPLAY_MS);
  }

  function stop() {
    clearInterval(timer);
  }

  function restart() {
    stop();
    start();
  }

  prevBtn.addEventListener('click', function () { prev(); restart(); });
  nextBtn.addEventListener('click', function () { next(); restart(); });
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);

  start();
})();
