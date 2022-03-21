build:
	docker-compose down
	docker-compose up --build

delete:
	node seeder --delete

import:
	node seeder --import

run_ci:
    sudo docker run --name jenkins-master -p 80:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):/usr/bin/docker -d jenkins/jenkins:lts


prune-docker:
	- docker system prune
	- docker image prune -a
	- docker container prune