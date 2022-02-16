pipeline {

    agent any

    stages {

        stage("build") {

            steps {
                echo 'Building the NodeJS APP OK..'
                sh 'npm install'
            }

        }

        stage("test") {

            steps {
                echo 'Testing the app...'
            }

        }

        stage("deploy") {

            steps {
                echo 'Deploying the application...'
            }

        }

    }
}
