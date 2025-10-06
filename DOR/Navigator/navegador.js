//Consegui los navigator y la forma de usarlos por: https://developer.mozilla.org/es/docs/Web/API/Navigator
// y de esta https://tutobasico.com/navigator-javascript/

//cree una variable para unir los javascript con el HTML
document.addEventListener('DOMContentLoaded', (event) => {

const infoContainer = document.getElementById('navigator-info');
    
//Selecciono los navigator que quiero que esten reglejados en un array puesto
const userData = {

    'User Agent (navegador)': navigator.userAgent,
        'App Name (obsoleto)': navigator.appName,
        'App Version (detallado)': navigator.appVersion,
        'Plataforma (OS)': navigator.platform,
        'Idioma preferido': navigator.language,
        'Estado Online': navigator.onLine ? 'Sí (Conectado)' : 'No (Desconectado)',
        'Hardware Concurrente (núcleos de CPU)': navigator.hardwareConcurrency 

};

// Los navigator seleccionados los escribo uno por uno para mostrar por pantalla 
let htmlContent = '<ul>';

htmlContent += '<li><strong>User Agent (navegador):</strong> <span>' + userData['User Agent (navegador)'] + '</span></li>';
htmlContent += '<li><strong>App Name (obsoleto):</strong> <span>' + userData['App Name (obsoleto)'] + '</span></li>';
htmlContent += '<li><strong>App Version (detallado):</strong> <span>' + userData['App Version (detallado)'] + '</span></li>';
htmlContent += '<li><strong>Plataforma (OS):</strong> <span>' + userData['Plataforma (OS)'] + '</span></li>';
htmlContent += '<li><strong>Idioma preferido:</strong> <span>' + userData['Idioma preferido'] + '</span></li>';
htmlContent += '<li><strong>Estado Online:</strong> <span>' + userData['Estado Online'] + '</span></li>';
htmlContent += '<li><strong>Hardware Concurrente (núcleos de CPU):</strong> <span>' + userData['Hardware Concurrente (núcleos de CPU)'] + '</span></li>';


htmlContent += '</ul>';

infoContainer.innerHTML = htmlContent;

});