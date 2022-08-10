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
                    sh 'apt-get update'
                    sh 'apt-get upgrade'
                    sh 'apt-get install npm'
                    sh 'apt-get install sudo'
                    sh 'npm uninstall cypress'
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


        stage("deploy") {  // 2. Stage to deploy the application to AWS. Added PAT

            when {
             branch 'main'
          }

            steps {

                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: "credentials-id-here", accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    echo 'Building docker image for backend and frontend...'
                    sh 'docker login -u sabin2000 -p 123mini123'
                    sh 'docker push sabin2000/electrichouseholds'

                    echo 'Preparing to deploy to AWS'

                sh 'docker cp newkeyapri.pem 87a56cf6306b:/var/jenkins_home/workspace/eHouseholds-pipeline_main'
                sh 'aws --version'
                sh 'ssh -i "newkeyapri.pem" ubuntu@ec2-13-40-163-165.eu-west-2.compute.amazonaws.com'
                // Installing Jenkins on AWS EC2 server


                sh 'apt-get install jenkins'
                
                sh 'cd electricHouseholds'

                sh 'apt-get update'
                sh 'apt-get upgrade'
                sh 'apt-get install npm'
                sh 'apt-get install nodejs'

                sh 'node -v'
                sh 'npm -v'

                sh 'git pull https://github.com/sabin2000pro/electricHouseholds'

                dir('./backend/server') {

                    sh 'npm install pm2@latest -g'
                    echo 'Starting the backend server..'
                    sh 'pm2 start server.js'


                }

                dir('./frontend') {
                    echo 'Installing frontend dependencies...'

                    sh 'npm install'
                    sh 'npm install -g pm2'
                    sh 'npm run build'

                    sh 'pm2 start "npm start"'
                }

                }

                
                sh 'pm2 list'

            }
            

        }


    }
}
