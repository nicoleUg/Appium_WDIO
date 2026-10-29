pipeline {
    agent any
    tools { nodejs 'NodeJS'; jdk 'Java21' }
    options { skipDefaultCheckout(true); disableConcurrentBuilds(); timeout(time: 15, unit: 'MINUTES') }
    parameters {
        string(name: 'APP_URL', defaultValue: '', description: 'Identificador bs:// si el reloj ya esta subido. Si queda vacio, subir APP_PATH.')
        string(name: 'APP_PATH', defaultValue: 'C:/Users/LENOVO LOQ/Documents/Codex/2026-10-26/no-se-como-hacer-no-tengo-2/outputs/Reloj-Google-9.1/base.apk', description: 'Ruta del APK en el agente Jenkins. No subir ZIP de respaldo.')
        string(name: 'BS_DEVICE', defaultValue: 'Google Pixel 8', description: 'Dispositivo disponible en BrowserStack')
        string(name: 'BS_ANDROID', defaultValue: '14.0', description: 'Version de Android en BrowserStack')
        choice(name: 'TEST_SPEC', choices: ['test/specs/alarmaSimple.js', 'test/specs/alarma.js', 'test/specs/*.js'], description: 'Primero validar el flujo simple para ahorrar minutos.')
    }
    stages {
        stage('Obtener codigo') {
            steps { cleanWs(); checkout scm }
        }
        stage('Instalar dependencias') {
            steps { bat 'call npm.cmd ci --no-audit --no-fund' }
        }
        stage('Subir reloj a BrowserStack') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'browserstack', usernameVariable: 'BROWSERSTACK_USERNAME', passwordVariable: 'BROWSERSTACK_ACCESS_KEY')]) {
                    withEnv(["BS_APP_URL=${params.APP_URL}", "BS_APP_PATH=${params.APP_PATH}"]) {
                        bat '@node scripts/upload-browserstack.cjs'
                    }
                }
                script { env.BROWSERSTACK_APP_ID = readFile('browserstack-app.txt').trim() }
            }
        }
        stage('Ejecutar Appium y WDIO en la nube') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'browserstack', usernameVariable: 'BROWSERSTACK_USERNAME', passwordVariable: 'BROWSERSTACK_ACCESS_KEY')]) {
                    withEnv(["BS_DEVICE=${params.BS_DEVICE}", "BS_ANDROID=${params.BS_ANDROID}", "TEST_SPEC=${params.TEST_SPEC}"]) {
                        bat 'call npm.cmd run test:browserstack'
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                if (fileExists('browserstack-upload-error.json')) {
                    archiveArtifacts artifacts: 'browserstack-upload-error.json'
                }
                if (fileExists('allure-results')) {
                    allure commandline: 'Allure-2.35.1', jdk: 'Java21', results: [[path: 'allure-results']], reportBuildPolicy: 'ALWAYS'
                    archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: false
                }
            }
        }
        success { echo 'Ejecucion BrowserStack completada. Abrir Allure y el dashboard de BrowserStack.' }
        failure { echo 'No se completaron las pruebas: revisar la etapa que fallo. No confundir un error de carga con pruebas aprobadas.' }
    }
}
