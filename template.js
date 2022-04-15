const data = require('./data')
const {ipcMain} = require('electron')

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
    }, geraMenuPrincipalTemplate(app){
        let templateMenu = [
            {
                label: 'View',
                submenu: [{
                    role: 'reload'
                },
                {
                    role: 'toggledevtools'
                  }
                ]
            },
            {
                label: 'Window',
                submenu: [
                    {
                        role: 'minimize'                       
                    },
                    {
                        role: 'close'
                    }
                ]
            },
            {
                label: 'Sobre',
                submenu: [
                    {
                        label: 'Sobre o Alura Timer',
                        click: () => {
                            ipcMain.emit('abrir-janela-sobre');
                        }
                    }
                ]
            }
        ];
        if(process.platform == 'darwin'){
            templateMenu.unshift({
                label: app.getName(),
                submenu: [
                    {
                        label: 'Estou rodando no Mac!'
                    }
                ]
            })
         }
         return templateMenu;
    }
}