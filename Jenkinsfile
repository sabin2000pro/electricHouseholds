pipeline {

    agent any

    tools {nodejs "nodejs"}

    stages {

        stage("build") {

            steps {
                echo 'Building the NodeJS APP OK..'
                sh 'node -v'
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
