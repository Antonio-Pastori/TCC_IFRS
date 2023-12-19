function Pega_Infos(Infos_da_Planta_json){

    var nomePlanta = Infos_da_Planta_json.Nome;
    var luz = Infos_da_Planta_json.Luz;
    var solo = Infos_da_Planta_json.Solo;
    var ambiente = Infos_da_Planta_json.Ambiente;
    var nomeC = Infos_da_Planta_json.NomeCientifico;
    var imagemP = Infos_da_Planta_json.Imagem;
    var dificuldade = Infos_da_Planta_json.Dificuldade;
    var adubacao = Infos_da_Planta_json.Cuidados['1'];
    var regacao = Infos_da_Planta_json.Cuidados['0'];
    var doencasPlanta = Infos_da_Planta_json.Doencas;

    console.log(doencas);

    document.getElementById('nomePlanta').innerHTML = nomePlanta;
    document.getElementById('luz').innerHTML = luz;
    document.getElementById('solo').innerHTML = solo;
    document.getElementById('ambiente').innerHTML = ambiente;
    document.getElementById('nomeC').innerHTML = nomeC;
    document.getElementById('agua').innerHTML = regacao;
    document.getElementById('adubo').innerHTML = adubacao;
    

    var imagemPlanta = document.getElementById('fotoplanta')
    if(imagemPlanta)
        imagemPlanta.style.backgroundImage = 'url(' + imagemP + ')';

    const dificuldadeDiv = document.getElementById('difi');

    
    for (let i = 0; i < 10; i++) {
      const bola = document.createElement('div');
      bola.className = 'bola';

     
      const cor = `rgb(${i * 25}, ${255 - (i * 25)}, 0)`;

      bola.style.borderColor = cor; // Define a cor da borda
      if (i < dificuldade) {
        bola.style.backgroundColor = cor; // Define a cor de preenchimento
      }
      dificuldadeDiv.appendChild(bola);
    }

    var cuidadosContainer = document.getElementById('cuidadosContainer');
    if (cuidadosContainer && plantaInfo.Cuidados && plantaInfo.Cuidados.length > 0) {
        for (var i = 0; i < plantaInfo.Cuidados.length; i++) {
            var paragrafo = document.createElement('p');
            paragrafo.textContent = plantaInfo.Cuidados[i];
            cuidadosContainer.appendChild(paragrafo);
        }
    }

    const ulElement = document.getElementById('doencas');

      ulElement.innerHTML = '';

     
      doencasPlanta.forEach(item => {
        const liElement = document.createElement('li');
        liElement.textContent = item;
        ulElement.appendChild(liElement);
      });
    
}


function voltar(){
    window.location.href = '/redirecionar';
}