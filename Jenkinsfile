pipeline {

    agent any
    tools {nodejs "node"}

    stages {
         
        stage("Prepare Docker Dompose") {

            steps {
                sh 'curl -L "https://github.com/docker/compose/releases/download/v2.6.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                sh 'chmod +x /usr/local/bin/docker-compose'

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

        withDockerRegistry([credentialsId: 'docker-hub-credentials', usernameVariable: 'sabin2000', passwordVariable: '123mini123'])

            when {
             branch 'main'
          }

            steps {

                echo 'Building docker image for backend and frontend...'
                sh 'docker login'
                sh 'docker push sabin2000/electrichouseholds'

                echo 'Preparing to deploy to AWS'

            }
            

        }



    }
}
