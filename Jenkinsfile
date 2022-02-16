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
                echo 'Testing the app...'
                sh 'cd backend'
                sh 'npm test'
            }

        }

        stage("deploy") {

            steps {
                echo 'Deploying the application...'
            }

        }

    }
}
