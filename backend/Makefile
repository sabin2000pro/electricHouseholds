build:
	docker-compose down
	docker-compose up --build

delete:
	node seeder --delete

import:
	node seeder --import

run_ci:
	docker run -p 8080:8080 --name=jenkins-master jenkins/jenkins