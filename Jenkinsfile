pipeline {

    agent any
    tools {nodejs "node"}

    stages {
         
        stage("Prepare Docker Dompose") {
            steps {
            sh 'curl -L "https://github.com/docker/compose/releases/download/v2.6.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'

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
                sh 'docker-compose up --build -d'
                echo 'Preparing to push to docker hub'

                echo 'docker-compose push sabin2000/electrichouseholds'
            }
            

        }



    }
}
