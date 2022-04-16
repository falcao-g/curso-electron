const { ipcRenderer } = require('electron');
const data = require('../../data');
const timer = require('./timer');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play')
let tempo = document.querySelector('.tempo')
let curso = document.querySelector('.curso')
let botao_adicionar = document.querySelector('.botao-adicionar')
let campo_adicionar = document.querySelector('.campo-adicionar')

window.onload = () => {

    data.pegaDados(curso.textContent)
        .then((dados) => {
            tempo.textContent = dados.tempo;
        })
}

linkSobre.addEventListener('click', function() {
    ipcRenderer.send('abrir-janela-sobre');
});

let play = false
botaoPlay.addEventListener('click', function() {
    if (play) {
        timer.parar(curso.textContent)
        botaoPlay.src = 'img/play-button.svg'
        play = false
        new Notification('Alura timer', {
            body: 'O timer do curso ' + curso.textContent + ' foi pausado!',
            icon: 'img/stop-button.png'
        })
    } else {
        timer.iniciar(tempo)
        botaoPlay.src = 'img/stop-button.svg'
        play = true
        new Notification('Alura timer', {
            body: 'O timer do curso ' + curso.textContent + ' foi iniciado!',
            icon: 'img/play-button.png'
        })
    }
})

ipcRenderer.on('curso-trocado', (event, nome_curso) => {
    botaoPlay.click()
    curso.textContent = nome_curso
    data.pegaDados(nome_curso)
        .then((dados) => {
            tempo.textContent = dados.tempo
        })
})

botao_adicionar.addEventListener('click', () => {
    if (campo_adicionar.value.length > 0) {
        botaoPlay.click()
        let novoCurso = campo_adicionar.value
        campo_adicionar.value = ''
        curso.textContent = novoCurso
        tempo.textContent = '00:00:00'
        ipcRenderer.send('curso-adicionado', novoCurso)
    }
})

ipcRenderer.on('atalho-iniciar-parar', () => {
    botaoPlay.click()
})