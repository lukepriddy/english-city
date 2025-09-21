/**
 * Basic scaffolding script for the English City Day 1 prototype.
 *
 * The real-time chat logic will be added in a follow-up iteration. For now we
 * provide lightweight affordances so designers and developers can visualize
 * where interactive components will live and confirm anchor links work.
 */

document.addEventListener('DOMContentLoaded', () => {
  highlightActiveNav();
  wireStubButtons();
});

function highlightActiveNav() {
  const navLinks = document.querySelectorAll('.site-nav a');
  if (!('IntersectionObserver' in window) || navLinks.length === 0) {
    return;
  }
  navLinks[0].classList.add('is-active');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.site-nav a[href="#${id}"]`);
        if (!link) return;

        if (entry.isIntersecting) {
          navLinks.forEach((navLink) => navLink.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    },
    {
      threshold: 0.35,
      rootMargin: '-20% 0px -60% 0px'
    }
  );

  document.querySelectorAll('main section.panel').forEach((section) => {
    observer.observe(section);
  });
}

function wireStubButtons() {
  document.querySelectorAll('.stub-button').forEach((button) => {
    button.addEventListener('click', () => {
      const sceneName = button.dataset.scene ?? 'this scene';
      window.alert(
        `Chat flow for ${sceneName} is coming soon. Hook your AI integration here.`
      );
    });
  });
}
