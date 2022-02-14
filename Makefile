publish:
	git add .
	git commit -m "Publishing"
	git push -u origin main

build_docker:
	docker-compose down
	docker-compose up --build