pipeline {

    agent any

    tools {nodejs "node"}

    stages {

        stage("build") {

            steps {

                dir('./frontend') {
                      sh 'npm install'
                      sh "npm run build"
                }
              
            }

        }

        stage("test") {

            steps {
                
                dir('./backend') {    
                     echo 'Running backend tests..'        
                     sh 'npm run test'
                }
               
            }

        }


        stage("deploy") {

            when {
             branch 'main'
          }

            steps {

                echo 'Building docker image...'

                sh 'docker login'
                sh 'docker-compose up --build -d'
                sh 'docker-compose push backend'
                sh 'docker-compose push frontend'

                echo 'Starting deployment to AWS Server...'

                sh ''
            }
            

        }



    }
}
