# For POSTGRES:

docker container run -d --name node_blog -v blog_db:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=secret_password postgres

docker container exec -it test_db psql -U postgres