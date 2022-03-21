pipeline {
    registryCredential = 'dockerhub'
    PATH = "$PATH:/usr/bin"

    agent any

    tools {nodejs "nodejs"}

    stages {

        stage("build") {

            steps {
                dir('./frontend') {
                      sh 'node -v'
                      sh 'npm install'
                      sh "npm run build"
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
                echo "PATH is: $PATH"
                sh "/usr/bin/docker-compose up --build -d"
                }
            

        }

    }
}
