publish:
	git add .
	git commit -m "Publishing"
	git push -u origin main

change_branch:
	git checkout bug-fix

main_branch:
	git checkout main

check_branch:
	git branch