all : per build 
	
git : per add commit push 
	
add : 
	git add .

commit :
	git commit -m "$(shell date +'%Y-%m-%d %H:%M')"

push :
	git push 

run :
	docker compose up

build :
	docker-compose up --build

down:
	docker-compose down -v 

remove : per
	rm -rf chat/data game/data track/data auth/data

restart:down run

per :
	sudo chmod -R 0777 .

clean : 
	docker-compose  down
	docker-compose rm ${docker-compose ps -a -q}

fclean : clean
	docker system prune -a
	
re : fclean all