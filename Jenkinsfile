pipeline {

    agent any

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
                     sh 'npm run test'
                }
               
            }

        }

        stage("deploy") {

            steps {
                    sh 'docker build -t sabin2000/ehouseholds .'
                    sh 'docker push sabin2000/ehouseholds'
                }
            

        }

    }
}
