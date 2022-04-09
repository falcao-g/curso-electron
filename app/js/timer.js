const { ipcRenderer } = require('electron')
const moment = require('moment')
let segundos;
let tempo;

module.exports = {
    iniciar (el) {
        tempo = moment.duration(el.textContent)
        segundos = tempo.asSeconds()
        timer = setInterval(() => {
            segundos++
            el.textContent = moment().startOf('day').seconds(segundos).format('HH:mm:ss')
        }, 1000)
    },
    parar (curso) {
        clearInterval(timer)
        let tempoEstudado = moment().startOf('day').seconds(segundos).format('HH:mm:ss')
        ipcRenderer.send('curso-parado', curso, tempoEstudado)
    }
}