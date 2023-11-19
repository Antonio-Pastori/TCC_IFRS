
function Desliza() {
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
}

function Sidebar_Open(){
  const profileButton = document.getElementById('perfil');
  const sidebar = document.getElementById('sidebar');
  const voltaButton = document.getElementById('volta');
  const main = document.querySelector('content');

  profileButton.addEventListener('click', () => {
    sidebar.style.right = '0';
  });

  voltaButton.addEventListener('click', () => {
    sidebar.style.right = '-70vw';
  })
}


function Direciona_Categoria(categoria) {
  console.log(categoria);
  window.location.href = '/categorias/' + categoria;
}

function Define_Categoria(){
    const Flores = document.getElementById('Flores');
    const Ornamentais = document.getElementById('Ornamentais');
    const Frutiferas = document.getElementById('Frutiferas');
    const Chas_Temp = document.getElementById('ChasTemp');
    const Suculentas = document.getElementById('Suculentas');
    const Hortalicas = document.getElementById('Hortalicas');

    
    Flores.addEventListener('click', () => {
      Direciona_Categoria('Flores');
    });
    Ornamentais.addEventListener('click', () => {
      Direciona_Categoria('Ornamentais');
    });
    Frutiferas.addEventListener('click', () => {
      Direciona_Categoria('Frutiferas');
    });
    Chas_Temp.addEventListener('click', () => {
      Direciona_Categoria('ChasTemp');
    });
    Suculentas.addEventListener('click', () => {
      Direciona_Categoria('Suculentas');
    });
    Hortalicas.addEventListener('click', () => {
      Direciona_Categoria('Hortalicas');
    });
}
