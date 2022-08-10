pipeline {

    agent any
    tools {nodejs "node"}

    environment {
        AWS_DEFAULT_REGION="eu-west-2"
    }

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
                    sh 'apt-get update -y'
                    sh 'apt-get upgrade -y'
                    sh 'apt-get install npm -y'
                    sh 'apt-get install sudo -y'
                    sh 'npm uninstall cypress -y'
                    sh 'npm install jest'
                }

            }
        }

        stage('run-tests-frontend') {

            steps {
                dir('./frontend') {
                    echo 'Running front-end tests...'
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

        // Prepare Kubernetes Deployments


        stage("deploy") {  // 2. Stage to deploy the application to AWS. Added PAT

            when {
             branch 'main'
          }

            steps {

                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: "eHouseholds-app", accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    echo 'Building docker image for backend and frontend...'
                    sh 'docker login -u sabin2000 -p 123mini123'
                    sh 'sudo su -s /bin/bash jenkins'
                    sh 'sudo ssh -i "newkeyapri.pem" ubuntu@ec2-13-40-163-165.eu-west-2.compute.amazonaws.com -o StrictHostKeyChecking=no'
                    
                    sh 'cd electricHouseholds'
                    sh 'git pull https://github.com/sabin2000pro/electricHouseholds' // Pull the recent version of the git repo
    
                    sh 'cd frontend'
                    sh 'docker pull sabin2000/electrichouseholds-client'
                    sh 'sudo docker run -it -p 3000:3000 sabin2000/electrichouseholds-client'

                }

            
            }
            

        }


    }
}
