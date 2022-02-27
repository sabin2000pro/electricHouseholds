pipeline {

    agent any

    tools {nodejs "nodejs"}

    stages {

        stage("build") {

            steps {
                sh 'node -v'
                sh 'npm install'
            }

        }

        stage("test") {

            steps {
                
                dir('./backend') {            
                     sh 'npm run test'
                }
               
            }

        }

        stage("E2E Tests") {
            steps {

                dir('./frontend/cypress') {
                    sh 'npx cypress open'
                }

            }
        }

        stage("deploy") {

            steps {

                dir("./frontend") {

                    sh 'npm install'
                    sh 'npm install react-dom --save'
                    sh 'CI=false npm run deploy'
                }
            }

        }

    }
}
