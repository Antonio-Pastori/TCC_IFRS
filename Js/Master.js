const options = document.querySelector('.categorias');
const selector = document.querySelector('.seletor');
const optionItems = document.querySelectorAll('.option');

let isDragging = false;
let startPosX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

selector.addEventListener('touchstart', (e) => {
  isDragging = true;
  startPosX = e.touches[0].clientX;
  prevTranslate = currentTranslate;
  cancelAnimationFrame(animationId);
});

selector.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const diffX = e.touches[0].clientX - startPosX;
  currentTranslate = prevTranslate + diffX;
  options.style.transform = 'translateX(${currentTranslate}px)';
});

selector.addEventListener('touchend', () => {
  isDragging = false;
  animationId = requestAnimationFrame(snapBack);
});












