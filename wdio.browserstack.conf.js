const { config: local } = require('./wdio.conf')

for (const name of ['BROWSERSTACK_USERNAME', 'BROWSERSTACK_ACCESS_KEY', 'BROWSERSTACK_APP_ID']) {
    if (!process.env[name]) throw new Error(`Falta la variable ${name}`)
}

exports.config = {
    ...local,
    hostname: 'hub-cloud.browserstack.com',
    protocol: 'https',
    port: 443,
    path: '/wd/hub',
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    specs: [process.env.TEST_SPEC || './test/specs/alarmaSimple.js'],
    maxInstances: 1,
    services: [],
    logLevel: 'error',
    connectionRetryCount: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:app': process.env.BROWSERSTACK_APP_ID,
        'appium:deviceName': process.env.BS_DEVICE || 'Google Pixel 8',
        'appium:platformVersion': process.env.BS_ANDROID || '14.0',
        'appium:appPackage': 'com.google.android.deskclock',
        'appium:appActivity': 'com.android.deskclock.DeskClock',
        'appium:autoGrantPermissions': true,
        'bstack:options': {
            projectName: 'Reloj Android - WDIO',
            buildName: `Jenkins ${process.env.JOB_NAME || 'Appium'} #${process.env.BUILD_NUMBER || 'local'}`,
            sessionName: 'Pruebas del reloj',
            deviceOrientation: 'portrait',
            language: 'en',
            locale: 'US',
            debug: true,
            video: true
        }
    }],
    reporters: ['spec', ['allure', { outputDir: 'allure-results', disableWebdriverStepsReporting: true }]],
    afterTest: async function (test, context, { passed }) {
        if (!passed) await browser.takeScreenshot()
    }
}
