const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(returnFocus = false) {
  navigation.classList.remove('is-open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Abrir menu');
  if (returnFocus) menu.focus();
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
const mobile = matchMedia('(max-width: 600px)');
mobile.addEventListener('change', () => closeMenu());
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigation.querySelectorAll('a').forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px' });
  document.querySelectorAll('main > section').forEach(section => sectionObserver.observe(section));
}
const hero = document.querySelector('.hero');
const motionAllowed = matchMedia('(any-hover: hover) and (any-pointer: fine)');
const effectsPreferenceKey = 'portfolio-pointer-effects';
let motionDisabled = false;
try {
  motionDisabled = localStorage.getItem(effectsPreferenceKey) === 'disabled';
} catch { /* Keep the default when browser storage is unavailable. */ }
const motionToggle = document.createElement('button');
motionToggle.type = 'button';
motionToggle.className = 'motion-toggle';
hero.querySelector('.hero-top').append(motionToggle);
function effectsEnabled() {
  return !motionDisabled && motionAllowed.matches;
}
function updateMotionControl() {
  const enabled = effectsEnabled();
  document.documentElement.classList.toggle('pointer-effects', enabled);
  motionToggle.textContent = enabled ? 'Desativar efeitos ↗' : 'Ativar efeitos ↗';
  motionToggle.setAttribute('aria-pressed', String(enabled));
  motionToggle.hidden = !motionAllowed.matches;
}
motionToggle.addEventListener('click', () => {
  motionDisabled = !motionDisabled;
  try {
    localStorage.setItem(effectsPreferenceKey, motionDisabled ? 'disabled' : 'enabled');
  } catch { /* The toggle still works for this visit without storage. */ }
  resetMotion();
  updateMotionControl();
});
window.addEventListener('storage', event => {
  if (event.key !== effectsPreferenceKey && event.key !== null) return;
  motionDisabled = event.newValue === 'disabled';
  resetMotion();
  updateMotionControl();
});
const magneticTargets = document.querySelectorAll('.round-link, .contact-link, #copy_email');
const projectImages = document.querySelectorAll('.project-image');
const projectCursor = document.createElement('div');
projectCursor.className = 'project-cursor';
projectCursor.setAttribute('aria-hidden', 'true');
projectCursor.textContent = 'Ver projeto ↗';
document.body.append(projectCursor);
let motionFrame = 0;
let latestPointer;
let activeMagnet = null;
let activeProject = null;
let heroActive = false;

// One lightweight canvas: each segment fades for 1 second, then is discarded.
const laserCanvas = document.createElement('canvas');
laserCanvas.className = 'hero-laser';
laserCanvas.setAttribute('aria-hidden', 'true');
hero.prepend(laserCanvas);
const laserContext = laserCanvas.getContext('2d');
let laserSegments = [];
let laserPrevious = null;
let laserFrame = 0;
let laserWidth = 0;
let laserHeight = 0;
function sizeLaser() {
  const bounds = hero.getBoundingClientRect();
  laserWidth = bounds.width;
  laserHeight = bounds.height;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  laserCanvas.width = Math.round(laserWidth * ratio);
  laserCanvas.height = Math.round(laserHeight * ratio);
  laserContext?.setTransform(ratio, 0, 0, ratio, 0, 0);
  clearLaser();
}
function clearLaser() {
  cancelAnimationFrame(laserFrame);
  laserFrame = 0;
  laserSegments = [];
  laserPrevious = null;
  laserContext?.clearRect(0, 0, laserWidth, laserHeight);
}
function drawLaser(now) {
  laserFrame = 0;
  if (!laserContext) return;
  laserContext.clearRect(0, 0, laserWidth, laserHeight);
  laserSegments = laserSegments.filter(segment => now - segment.time < 1000);
  laserContext.lineCap = 'round';
  for (const segment of laserSegments) {
    const fade = Math.pow(1 - (now - segment.time) / 1000, 1.5);
    for (const [width, color, alpha] of [[22, '#9cff24', .12], [8, '#baff32', .45], [2.5, '#edffac', 1]]) {
      laserContext.globalAlpha = fade * alpha;
      laserContext.strokeStyle = color;
      laserContext.lineWidth = width;
      laserContext.beginPath();
      laserContext.moveTo(segment.from.x, segment.from.y);
      laserContext.lineTo(segment.to.x, segment.to.y);
      laserContext.stroke();
    }
  }
  laserContext.globalAlpha = 1;
  if (laserSegments.length) laserFrame = requestAnimationFrame(drawLaser);
}
function addLaserPoint(x, y) {
  if (!laserContext) return;
  const now = performance.now();
  const point = { x, y, time: now };
  if (laserPrevious && now - laserPrevious.time < 120 && Math.hypot(x - laserPrevious.x, y - laserPrevious.y) > 1) {
    laserSegments.push({ from: laserPrevious, to: point, time: now });
    if (laserSegments.length > 120) laserSegments.shift();
    if (!laserFrame) laserFrame = requestAnimationFrame(drawLaser);
  }
  laserPrevious = point;
}
sizeLaser();
if ('ResizeObserver' in window) new ResizeObserver(sizeLaser).observe(hero);
else window.addEventListener('resize', sizeLaser);

function resetMotion() {
  clearLaser();
  cancelAnimationFrame(motionFrame);
  motionFrame = 0;
  latestPointer = null;
  heroActive = false;
  activeMagnet = null;
  activeProject = null;
  hero.style.removeProperty('--depth-x');
  hero.style.removeProperty('--depth-y');
  hero.classList.remove('cursor-active');
  magneticTargets.forEach(target => {
    target.style.removeProperty('--magnet-x');
    target.style.removeProperty('--magnet-y');
  });
  projectCursor.classList.remove('is-visible');
}
function renderMotion() {
  motionFrame = 0;
  if (!latestPointer || !effectsEnabled()) return;
  const { x, y } = latestPointer;
  if (heroActive) {
    const bounds = hero.getBoundingClientRect();
    hero.style.setProperty('--cursor-x', `${x - bounds.left}px`);
    hero.style.setProperty('--cursor-y', `${y - bounds.top}px`);
    hero.classList.add('cursor-active');
    addLaserPoint(x - bounds.left, y - bounds.top);
    hero.style.setProperty('--depth-x', `${(x - bounds.left - bounds.width / 2) / bounds.width * 48}px`);
    hero.style.setProperty('--depth-y', `${(y - bounds.top - bounds.height / 2) / bounds.height * 48}px`);
  }
  if (activeMagnet) {
    const bounds = activeMagnet.getBoundingClientRect();
    activeMagnet.style.setProperty('--magnet-x', `${Math.max(-10, Math.min(10, (x - bounds.left - bounds.width / 2) * .2))}px`);
    activeMagnet.style.setProperty('--magnet-y', `${Math.max(-10, Math.min(10, (y - bounds.top - bounds.height / 2) * .2))}px`);
  }
  if (activeProject) {
    projectCursor.style.left = `${x}px`;
    projectCursor.style.top = `${y}px`;
    projectCursor.classList.add('is-visible');
  }
}
document.addEventListener('pointermove', event => {
  if (!effectsEnabled() || event.pointerType !== 'mouse') {
    resetMotion();
    return;
  }
  heroActive = hero.contains(event.target);
  activeMagnet = event.target.closest('.round-link, .contact-link, #copy_email');
  activeProject = event.target.closest('.project-image');
  if (!heroActive && !activeMagnet && !activeProject) return;
  latestPointer = { x: event.clientX, y: event.clientY };
  if (!motionFrame) motionFrame = requestAnimationFrame(renderMotion);
}, { passive: true });
hero.addEventListener('pointerenter', () => { heroActive = true; });
hero.addEventListener('pointerleave', () => {
  laserPrevious = null;
  heroActive = false;
  hero.style.removeProperty('--depth-x');
  hero.style.removeProperty('--depth-y');
  hero.classList.remove('cursor-active');
});
magneticTargets.forEach(target => {
  target.addEventListener('pointerenter', () => { activeMagnet = target; });
  target.addEventListener('pointerleave', () => {
    activeMagnet = null;
    target.style.removeProperty('--magnet-x');
    target.style.removeProperty('--magnet-y');
  });
});
projectImages.forEach(target => {
  target.addEventListener('pointerenter', () => { activeProject = target; });
  target.addEventListener('pointerleave', () => {
    activeProject = null;
    projectCursor.classList.remove('is-visible');
  });
});
motionAllowed.addEventListener('change', () => { resetMotion(); updateMotionControl(); });
updateMotionControl();
window.addEventListener('blur', resetMotion);
window.addEventListener('scroll', resetMotion, { passive: true });
document.addEventListener('visibilitychange', resetMotion);
document.addEventListener('keydown', () => projectCursor.classList.remove('is-visible'));
let toastTimer;
document.querySelector('#copy_email').addEventListener('click', async () => {
  const toast = document.querySelector('#toast');
  try {
    await navigator.clipboard.writeText('fcbernardo1996@gmail.com');
    toast.textContent = 'E-mail copiado! Vamos conversar.';
  } catch {
    toast.textContent = 'Não foi possível copiar. Use o link de e-mail ao lado.';
  }
  clearTimeout(toastTimer);
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Animate in-page navigation consistently, including long jumps to contact.

let anchorFrame = 0;
function cancelAnchorScroll() {
  cancelAnimationFrame(anchorFrame);
  anchorFrame = 0;
}
function focusAnchor(target) {
  const temporaryTabIndex = !target.hasAttribute('tabindex');
  if (temporaryTabIndex) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  if (temporaryTabIndex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const hash = link.getAttribute('href');
  if (hash.length < 2) return;
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target) return;
  event.preventDefault();
  closeMenu();
  cancelAnchorScroll();
  const start = window.scrollY;
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || document.querySelector('.header').offsetHeight;
  const end = Math.max(0, Math.min(target.getBoundingClientRect().top + start - padding, document.documentElement.scrollHeight - window.innerHeight));
  if (location.hash !== hash) history.pushState(null, '', hash);
  if (Math.abs(end - start) < 2) {
    window.scrollTo({ top: end, behavior: 'instant' });
    focusAnchor(target);
    return;
  }
  const duration = Math.min(1250, Math.max(650, Math.abs(end - start) * .22));
  const started = performance.now();
  function step(now) {
    const progress = Math.min(1, (now - started) / duration);
    const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
    window.scrollTo({ top: start + (end - start) * eased, behavior: 'instant' });
    if (progress < 1) anchorFrame = requestAnimationFrame(step);
    else {
      anchorFrame = 0;
      focusAnchor(target);
    }
  }
  anchorFrame = requestAnimationFrame(step);
});
// Give control back immediately when the visitor scrolls or navigates manually.
window.addEventListener('wheel', cancelAnchorScroll, { passive: true });
window.addEventListener('touchstart', cancelAnchorScroll, { passive: true });
window.addEventListener('pointerdown', cancelAnchorScroll, { passive: true });
window.addEventListener('popstate', cancelAnchorScroll);
window.addEventListener('resize', cancelAnchorScroll);
document.addEventListener('keydown', event => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Escape', 'Tab'].includes(event.key)) cancelAnchorScroll();
});
