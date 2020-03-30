import './scss/main.scss';
import './img/sprite.svg';
import './img/cancel.png';

const expDate = document.querySelector('.exp-date');
const navItems = document.querySelectorAll('.navigation__item');
const sections = document.querySelectorAll('.about-section');
const priceTitle = document.querySelectorAll('.navigation__title');

function navigationTitleHandle() {
  let html;
  priceTitle.forEach(item => {
    if (window.innerWidth <= 600) {
      if (item.dataset.section === 'cancel') {
        html = 'Cancel';
      } else if (item.dataset.section === 'watch') {
        html = 'Watch';
      } else if (item.dataset.section === 'price') {
        html = 'Price';
      }
    } else {
      if (item.dataset.section === 'cancel') {
        html = 'No commitments <span>Cancel online at any time</span>';
      } else if (item.dataset.section === 'watch') {
        html = 'Watch anywhere';
      } else if (item.dataset.section === 'price') {
        html = 'Pick your price';
      }
    }

    if (!html) return;

    item.innerHTML = html;
  });
}

function smoothScroll(target, duration) {
  const targElement = document.querySelector(`.${target}`);
  const targPosition = targElement.getBoundingClientRect().top;
  const startPos = window.pageYOffset;
  let startTime = null;

  function animation(curTime) {
    if (startTime === null) startTime = curTime;

    const runTime = curTime - startTime;

    let progress = runTime / duration;

    progress = Math.min(progress, 1);

    const run = startPos + targPosition * easeInCubic(progress);

    window.scrollTo(0, run);

    if (runTime < duration) requestAnimationFrame(animation);
  }

  const easeInCubic = t => {
    return t * t * t;
  };

  requestAnimationFrame(animation);
}

function displaySection(section) {
  sections.forEach(el => {
    el.classList.remove('closed');
    if (!el.classList.contains(section)) {
      el.classList.add('closed');
    }
  });

  smoothScroll('about', 150);
}

function handleNavigation(e) {
  let target = null;
  if (e.target.localName === 'use' || e.target.localName === 'span') {
    target = e.target.parentElement.parentElement.parentElement;
  } else if (e.target.localName === 'svg' || e.target.localName === 'p') {
    target = e.target.parentElement.parentElement;
  } else if (e.target.localName === 'a') {
    target = e.target.parentElement;
  }
  navItems.forEach(navItem => {
    navItem.classList.remove('active');
    if (navItem === target) {
      navItem.classList.add('active');
    }
  });
  //displaying the appropiate section
  displaySection(target.dataset.section);
}

document.addEventListener('DOMContentLoaded', function displayExpData() {
  const date = new Date();
  const dataFormate = `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()}`;
  expDate.textContent = dataFormate;
});

navItems.forEach(navItem => {
  navItem.addEventListener('click', handleNavigation);
});

window.addEventListener('resize', navigationTitleHandle);
