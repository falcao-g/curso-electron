const data = require('./data')
const {app, ipcMain} = require('electron')

module.exports = {
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

        template.push(
            {
                type: 'separator'
            },
            {
                label: 'Fechar',
                click: () => {
                    app.quit()
                }
            }
        )

        return template
    },  geraMenuPrincipalTemplate(app){
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
                        role: 'minimize',
                        accelerator: 'Alt+M'                       
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
                        accelerator: 'CommandOrControl+I',
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