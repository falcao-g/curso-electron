const moment = require('moment')
let segundos;

module.exports = {
    iniciar (el) {
        let tempo = moment.duration(el.textContent)
        segundos = tempo.asSeconds()
        timer = setInterval(() => {
            segundos++
            el.textContent = moment().startOf('day').seconds(segundos).format('HH:mm:ss')
        }, 1000)
    },
    parar () {
        clearInterval(timer)
    }
}