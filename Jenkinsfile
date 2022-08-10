pipeline {

    agent any
    tools {nodejs "node"}

    stages {

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
                sh 'docker login'
                echo 'Starting deployment to AWS Server...'
            }
            

        }



    }
}
