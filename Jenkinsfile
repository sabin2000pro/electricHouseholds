pipeline {

    agent any

    tools {nodejs "nodejs"}

    stages {

        stage("build") {

            steps {
                sh 'node -v'
                sh 'npm install'

                dir('./backend') {
                    echo 'Running docker compose'
                    sh 'docker-compose up --build'
                }
            }

        }

        stage("test") {

            steps {
                
                dir('./backend') {            
                     sh 'npm run test'
                }
               
            }

        }

        stage("deploy") {

            steps {
                dir("./frontend") {

                    sh 'npm run deploy'
                }
            }

        }

    }
}
