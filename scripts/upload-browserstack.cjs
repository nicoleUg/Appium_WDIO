const fs = require('node:fs')
const path = require('node:path')

async function main() {
    const existing = process.env.BS_APP_URL?.trim()
    if (existing) {
        if (!existing.startsWith('bs://')) throw new Error('APP_URL debe empezar con bs://')
        fs.writeFileSync('browserstack-app.txt', existing)
        console.log('Se usara la aplicacion ya subida a BrowserStack.')
        return
    }
    for (const name of ['BROWSERSTACK_USERNAME', 'BROWSERSTACK_ACCESS_KEY', 'BS_APP_PATH']) {
        if (!process.env[name]) throw new Error(`Falta ${name}`)
    }
    const file = process.env.BS_APP_PATH
    if (!fs.existsSync(file)) throw new Error('No se encontro el APK en APP_PATH')
    if (!/\.(apk|aab|xapk)$/i.test(file)) throw new Error('APP_PATH debe ser APK, AAB o XAPK; no un ZIP de respaldo')
    const data = new FormData()
    data.append('file', new Blob([fs.readFileSync(file)]), path.basename(file))
    const auth = Buffer.from(`${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}`).toString('base64')
    const response = await fetch('https://api-cloud.browserstack.com/app-automate/upload', {
        method: 'POST', headers: { Authorization: `Basic ${auth}` }, body: data,
        signal: AbortSignal.timeout(180000)
    })
    const body = await response.json()
    if (!response.ok || !body.app_url) {
        // Guardar solo la respuesta de error; nunca las credenciales ni los headers.
        fs.writeFileSync('browserstack-upload-error.json', JSON.stringify(body, null, 2))
        throw new Error(`BrowserStack rechazo la carga (HTTP ${response.status}); revisar browserstack-upload-error.json`)
    }
    fs.writeFileSync('browserstack-app.txt', body.app_url)
    console.log('Aplicacion subida correctamente a BrowserStack.')
}
main().catch(error => { console.error(error.message); process.exitCode = 1 })
