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

function Entrar_Home(){
    var novaPagina = '/redirecionar';
    window.location.href = novaPagina;
}

function Direciona_Planta(id){
     // Faz uma solicitação AJAX para obter as informações da planta
     fetch(`/api/planta/${id}`)
     .then(response => {
         if (!response.ok) {
             throw new Error('Erro na solicitação. Código do status: ' + response.status);
         }
         return response.json();
     })
     .then(plantaInfo => {
         // Redireciona para a página de detalhes da planta, passando as informações como parâmetro de consulta
         window.location.href = `/planta/${id}?infos=${JSON.stringify(plantaInfo)}`;
     })
     .catch(error => console.error("Erro ao obter dados:", error));
}


function Define_Planta(){
    const Lista_Divs = document.getElementsByClassName('container_item');

    for (const elemento of Lista_Divs){
        elemento.addEventListener('click', ()=>{
            const id = elemento.id;
            
            Direciona_Planta(id);

        });
    }
}
      



