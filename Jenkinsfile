pipeline {

    agent any 

    environment {
        NODE_ENV = 'production'
    }

    tools {nodejs "node"}

    stages {

        stage("Docker Test") {
            agent {
                docker {
                    image 'node:18.7.0'
                    args '--name docker-node' // list any args
                }
            }

            steps {
                sh 'node --version'
            }
        }

        stage("build") { // 1. Stage 1 Build The Frontend

            steps {

                dir('./frontend') {
                      sh 'npm install'
                      sh "npm run build"
                }
              
            }

        }


        stage("deploy") { // 2. Stage to deploy the application to AWS

            when {
             branch 'main'
          }

            steps {

                echo 'Building docker image...'

                sh 'docker login'
                sh 'docker-compose up --build -d'
                sh 'docker-compose push backend'
                sh 'docker-compose push frontend'

                echo 'Starting deployment to AWS Server...'
            }
            

        }



    }
}
