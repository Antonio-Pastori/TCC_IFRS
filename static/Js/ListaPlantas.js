



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

