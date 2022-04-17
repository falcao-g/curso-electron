const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require('electron');
const data = require('./data')
const template = require('./template')

let mainWindow;
app.on('ready', () => {
    console.log('ready');
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    tray = new Tray(__dirname + '/app/img/icon-tray.png')
    trayMenu = template.geraTrayTemplate(mainWindow)
    tray.setContextMenu(Menu.buildFromTemplate(trayMenu))	
    

    let templateMenu = template.geraMenuPrincipalTemplate(app);
    Menu.setApplicationMenu(Menu.buildFromTemplate(templateMenu));

    globalShortcut.register('CmdorCtrl+Shift+S', () => {
        mainWindow.send('atalho-iniciar-parar')
    })

    globalShortcut.register('CmdorCtrl+Shift+R', () => {
        mainWindow.send('atalho-reiniciar')
    })

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
})

app.on('window-all-closed', () => {
    app.quit()
})

let sobreWindow = null;

ipcMain.on('abrir-janela-sobre', () => {
    if(sobreWindow == null) {
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 220,
            alwaysOnTop: true,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
            }
        });

        sobreWindow.on('closed', () => {
            sobreWindow = null
        })
    }
    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close();
});

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
    data.salvaDados(curso, tempoEstudado)
}) 

ipcMain.on('curso-adicionado', (event, curso) => {
    data.salvaDados(curso, '00:00:00')
    trayMenu = template.adicionaCurso(curso, mainWindow)
    tray.setContextMenu(Menu.buildFromTemplate(trayMenu))
})