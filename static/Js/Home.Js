
function Desliza() {
  const options = document.querySelector('.categorias');
  const selector = document.querySelector('.seletor');

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
}

function showSearch() {
  const searchContainer = document.getElementById('search-container');
  const textField = document.getElementById('search')
  const BotaoVolta = document.getElementById('voltaS')
  const resultContainer = document.getElementById('results-container')
  
  searchContainer.addEventListener('click', () =>{
    
    searchContainer.style.top = '0';
    searchContainer.style.position = 'fixed';
    searchContainer.style.backgroundColor = '#121111';
    searchContainer.style.height = '100%';
    
    
    textField.style.right = '0';
    textField.style.position = 'relative';
    textField.style.width = '80%';
    textField.style.height = '5vh';
    textField.style.margin = '10px';

    BotaoVolta.style.display = 'block';
    BotaoVolta.style.position = 'relative';
    BotaoVolta.style.left = '0';

    resultContainer.style.display = 'block';
  })


}

function hideSearch() {
    var novaPagina = '/redirecionar';
    window.location.href = novaPagina;
  }


function getSearchTerm() {
    const textField = document.getElementById('search');
    return textField.value;
  }

function performSearch() {
    const searchTerm = getSearchTerm();
    sendSearchRequest(searchTerm);
  }

function sendSearchRequest(searchTerm) {
    $.ajax({
      url: `/search?termo=${searchTerm}`,
      method: 'GET',
      success: handleSearchSuccess,
      error: handleSearchError,
    });
  }
  
  function handleSearchSuccess(data) {
    const resultsList = document.getElementById('results');
    const result_container = document.getElementById('results-container') 
    resultsList.innerHTML = '';

    const existingMessage = result_container.querySelector('p');
    if (existingMessage) {
      existingMessage.remove();
    }

    if (data && Array.isArray(data)) {
      const nomes = data.map(item => item.Nome);
      nomes.forEach(nome => {
        const listItem = document.createElement('li');
        listItem.textContent = nome;
        listItem.onclick = function(){
          paginaPlanta(nome);
        }
        resultsList.appendChild(listItem);
      });
    } else if (data && data.message){
      const messageItem = document.createElement('p');
      messageItem.textContent = data.message;
      result_container.appendChild(messageItem);
    }else {
      const noResultsItem = document.createElement('li');
      noResultsItem.textContent = 'Nenhum resultado encontrado ou mensagem disponível.';
      resultsList.appendChild(noResultsItem);
    }
  }


  function handleSearchError(error) {
    console.error(error);
    // Aqui você pode adicionar lógica para lidar com erros, como exibir uma mensagem de erro na interface do usuário.
  }

  function paginaPlanta(nome){
    fetch(`/api/planta/${nome}`)
     .then(response => {
         if (!response.ok) {
             throw new Error('Erro na solicitação. Código do status: ' + response.status);
         }
         return response.json();
     })
     .then(plantaInfo => {
         // Redireciona para a página de detalhes da planta, passando as informações como parâmetro de consulta
         window.location.href = `/planta/${nome}?infos=${JSON.stringify(plantaInfo)}`;
     })
     .catch(error => console.error("Erro ao obter dados:", error));
  }

function obterPlantaAleatoria() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var resposta = JSON.parse(xhr.responseText);
          Planta_Aleatoria(resposta.sorteada);
      }
  };

  xhr.open('GET', '/Home', true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send();
}

function Planta_Aleatoria(sorteada) {
  var nome_planta = sorteada.Nome;
  var imagem_sorteada = sorteada.Imagem;

  document.getElementById('NomePlantaSorteada').innerHTML = nome_planta;
  var imagemPlanta = document.getElementById('diario');
    imagemPlanta.style.backgroundImage = 'url(' + imagem_sorteada + ')';
  imagemPlanta.onclick = function(){
    paginaPlanta(nome_planta);
  }
}

  


