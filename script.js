// سوییچ بین سه رویکرد درمانی
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.approach-tabs button');
  const panels = document.querySelectorAll('.approach-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.a;
      tabs.forEach(t => t.classList.toggle('on', t === tab));
      panels.forEach(p => p.classList.toggle('on', p.dataset.a === target));
      history.replaceState(null, '', '#' + target);
    });
  });
  const hash = location.hash.replace('#', '');
  if (hash) {
    const wanted = document.querySelector(`.approach-tabs button[data-a="${hash}"]`);
    if (wanted) wanted.click();
  }

  // جست‌وجوی ساده در صفحه اصلی
  // بازآشکارسازی هنگام اسکرول
  const revealEls = document.querySelectorAll('.tile, .card, .section-title');
  revealEls.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));

  const searchInput = document.getElementById('siteSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim();
      document.querySelectorAll('.tile').forEach(tile => {
        const name = tile.querySelector('.name').textContent;
        tile.style.display = !q || name.includes(q) ? '' : 'none';
      });
    });
  }
});
