(function () {
  var triggers = Array.prototype.slice.call(document.querySelectorAll('.gallery-mosaic button'));
  var lightbox = document.getElementById('lightbox');
  if (!triggers.length || !lightbox) return;

  var imgEl = lightbox.querySelector('img');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');
  var current = 0;

  function open(index) {
    current = index;
    var img = triggers[current].querySelector('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function show(delta) {
    current = (current + delta + triggers.length) % triggers.length;
    var img = triggers[current].querySelector('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt;
  }

  triggers.forEach(function (btn, i) {
    btn.addEventListener('click', function () { open(i); });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function () { show(-1); });
  nextBtn.addEventListener('click', function () { show(1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(-1);
    if (e.key === 'ArrowRight') show(1);
  });
})();
