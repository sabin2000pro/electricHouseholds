build:
	docker-compose down
	docker-compose up --build

delete:
	node seeder --delete

import:
	node seeder --import

run_ci:
	sudo docker run -u 0 --privileged --name jenkins -p 8080:8080 --name=jenkins-master -d -v jenkins_home:/var/jenkins_home jenkins/jenkins

prune-docker:
	- docker system prune
	- docker image prune -a
	- docker container prune