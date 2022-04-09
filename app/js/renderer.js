const { ipcRenderer } = require('electron');
const timer = require('./timer');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play')
let tempo = document.querySelector('.tempo')
let curso = document.querySelector('.curso')

linkSobre.addEventListener('click', function() {
    ipcRenderer.send('abrir-janela-sobre');
});

let play = false
botaoPlay.addEventListener('click', function() {
    if (play) {
        timer.parar(curso.textContent)
        botaoPlay.src = 'img/play-button.svg'
        play = false
    } else {
        timer.iniciar(tempo)
        botaoPlay.src = 'img/stop-button.svg'
        play = true
    }
})