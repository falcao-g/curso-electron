const { app, BrowserWindow, ipcMain } = require('electron');
const data = require('./data_file')

app.on('ready', () => {
    console.log('ready');
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
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