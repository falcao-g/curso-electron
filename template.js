const data = require('./data')

module.exports = {
    templateInicial: null,
    geraTrayTemplate(win) {
        let template = [
            {
                label: 'Cursos'
            },
            {
                type: 'separator'
            }
        ]

        let cursos = data.getCursos()

        cursos.forEach((curso) => {
            template.push({
                label: curso,
                type: 'radio',
                click: () => {
                    win.send('curso-trocado', curso)
                }
            })
        })

        this.templateInicial = template
        return template
    }, adicionaCurso(curso, win) {
        this.templateInicial.push({
            label: curso,
            type: 'radio',
            click: () => {
                win.send('curso-trocado', curso)
            },
            checked: true
        })

        return this.templateInicial
    }
}