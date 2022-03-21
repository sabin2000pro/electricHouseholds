pipeline {

    agent { dockerfile true }

    tools {nodejs "nodejs"}

    stages {

        stage("build") {

            steps {
                dir('./frontend') {
                      sh 'node -v'
                      sh 'npm install'
                      sh "npm run build"
                }
              
            }

        }

        stage("test") {

            steps {
                
                dir('./backend') {    
                     echo 'Running tests..'        
                     sh 'npm run test'
                }
               
            }

        }

        stage("deploy") {

            steps {
                echo 'Building docker image...'
                sh 'docker build -t sabin2000/ehouseholds .'
                }
            

        }

    }
}
