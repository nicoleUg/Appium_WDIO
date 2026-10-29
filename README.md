# Reloj Android con Appium, WebdriverIO, BrowserStack y Jenkins

## Jenkins

Trabajo: Appium-BrowserStack. Pipeline script from SCM, Git https://github.com/nicoleUg/Appium_WDIO.git, rama */main, Script Path Jenkinsfile.

Herramientas: NodeJS, Java21 y Allure-2.35.1. Credencial Username with password con ID browserstack: Username de BrowserStack y Access Key como Password. No guardar secretos en Git.

La pipeline obtiene el codigo, instala con npm ci, sube la app mediante la API oficial, ejecuta pruebas Appium sobre BrowserStack y publica Allure. No requiere un emulador local ni iniciar un servidor Appium local para el modo nube.

## Parametros

- APP_URL: bs:// de una app previamente subida. Si se informa, omite la carga.
- APP_PATH: ruta local en el agente de un APK, AAB o XAPK valido. Por defecto usa el APK del reloj extraido de esta computadora. El APK no se distribuye en el repositorio.
- BS_DEVICE y BS_ANDROID: dispositivo y version disponibles en tu cuenta BrowserStack. Predeterminado: Google Pixel 8, Android 14.0.
- TEST_SPEC: primero alarmaSimple.js, luego alarma.js o todos los archivos. El modo simple contiene dos pruebas reales; no equivale a ejecutar toda la suite.

El reloj extraido es Google Clock 9.1. Su aceptacion e instalacion en BrowserStack deben comprobarse. Si la API rechaza el archivo, el build falla y conserva browserstack-upload-error.json. No se transforma un rechazo en un resultado de pruebas aprobado.

## Local

La configuracion wdio.conf.js original sigue disponible para tu emulador y servidor Appium local. npm test ejecuta alarmaSimple.js; npm run wdio conserva el comando original.

## Nube

npm run test:browserstack usa wdio.browserstack.conf.js. Requiere BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY y BROWSERSTACK_APP_ID. En Jenkins esas variables se inyectan de forma privada. Los selectores actuales esperan el reloj Google y texto en ingles.

Referencia: https://www.browserstack.com/docs/app-automate/api-reference/appium/apps
