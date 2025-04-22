function countUp(countField) {
  const target = +countField.getAttribute('data-target');
  const prefix = countField.getAttribute('data-prefix') || '';
  const suffix = countField.getAttribute('data-suffix') || '';
  const duration = 2000;
  const step = target / (duration / 16);

  let count = 0;

  function update() {
    count += step;
    if (count < target) {
      countField.textContent = `${prefix}${Math.floor(count)}${suffix}`;
      requestAnimationFrame(update);
    } else {
      countField.textContent = `${prefix}${target}${suffix}`;
    }
  }

  update();
}

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.countable').forEach(el => {
  observer.observe(el);
});