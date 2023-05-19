
pipeline{
    agent any
    stages{
        stage('Hello') {
            steps{
                sh 'echo Hello World'
                sh 'echo Hello Class'
                sh 'exit 1'
            }
        }
        stage("Test"){
            steps{
                sh 'echo Here Testing command'
            }
        }
    }
}