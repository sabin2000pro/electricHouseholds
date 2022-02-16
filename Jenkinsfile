pipeline {

    agent any

    tools {nodejs "nodejs-16.14.0"}

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
                     sh 'npm run'
                }
               
            }

        }

        stage("deploy") {

            steps {
                echo 'Deploying the application...'
            }

        }

    }
}
