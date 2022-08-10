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

        stage("run-tests-backend") {

            steps {

                dir('./backend') {
                    sh 'apt-get update'
                    sh 'apt-get upgrade'
                    sh 'apt-get install npm'
                    sh 'apt-get install sudo'
                    sh 'npm uninstall cypress'
                    sh 'npm install jest'
                }

            }
        }

        stage("package") {

            when {
                branch 'main'
            }

            steps {
                echo 'Packaging the application... Publishing to NPM...'
            }

        }


        stage("deploy") {  // 2. Stage to deploy the application to AWS. Added PAT

            when {
             branch 'main'
          }

            steps {

                echo 'Building docker image for backend and frontend...'
                sh 'docker login -u sabin2000 -p 123mini123'
                sh 'docker push sabin2000/electrichouseholds'

                echo 'Preparing to deploy to AWS'

                sh 'docker cp newkeyapri.pem 87a56cf6306b:/var/jenkins_home/workspace/eHouseholds-pipeline_main'
                sh 'ssh -i "newkeyapri.pem" ubuntu@ec2-13-40-163-165.eu-west-2.compute.amazonaws.com'
                sh 'cd electricHouseholds'
                sh 'npm install pm2'

                dir('./backend/server') {
                    echo 'Starting the backend server'
                }

            }
            

        }



    }
}
