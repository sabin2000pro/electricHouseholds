pipeline {

    agent any

    tools {nodejs "nodejs"}

    stages {

        stage("build") {

            steps {
                echo 'Building the NodeJS APP OK..'
                sh 'node -v'
                sh 'npm install'
            }

        }

        stage("test") {

            steps {
                
                dir('./backend') {
                     echo 'Testing the app...'
                
                     sh 'ls -a'
                     sh 'npm run test'
                }
               
            }

        }

        stage("deploy") {

            steps {
                dir("./frontend") {
                    
                    echo "Deploying the frontend after tests"
                    sh 'npm run deploy'
                }
            }

        }

    }
}
