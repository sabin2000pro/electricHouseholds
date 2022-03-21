pipeline {

    agent any

    tools {nodejs "nodejs"}

    stages {

        stage("build") {

            steps {
                dir('./backend') {
                      sh 'node -v'
                      sh 'npm install'
                      sh "npm build"
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

        stage("E2E Tests") {
            steps {

                dir('./frontend/cypress') {
                    sh 'npx cypress open'
                }

            }
        }

        stage("deploy") {

            steps {
                    sh 'npm install'
                    sh 'docker build -t sabin2000/ehouseholds .'
                    sh 'docker push sabin2000/ehouseholds'
                }
            

        }

    }
}
