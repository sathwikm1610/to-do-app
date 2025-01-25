pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'todo-app'
        REGISTRY_URL = 'us.icr.io'
        CLUSTER_NAME = 'to-do-list'
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/sathwikm1610/to-do-app.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t us.icr.io/to-do-list:todo-app .'
                }
            }
        }
        stage('Push Docker Image to IBM Cloud Container Registry') {
            steps {
                script {
                    sh 'docker push us.icr.io/to-do-list:todo-app'
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh '''
                        ibmcloud login --apikey VgLACSePZjDelmZahWYj2b5UA-CW8eArH7YtQH-qzB14 -r chennai -g to-do-list-group
                        ibmcloud ks cluster config --cluster to-do-list
                        kubectl apply -f k8s/deployment.yaml

                    '''
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline executed successfully.'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
