docker build --no-cache -t masters-backend \.
docker run -p 8080:5000 -d -it masters-backend