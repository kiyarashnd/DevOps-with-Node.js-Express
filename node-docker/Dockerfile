# create one layer of image (hey look we downloaded the node image from docker hub and cache that result)
FROM node:15
# we set the working directory and cache result of that
WORKDIR  /app
COPY package.json .
# build the container
RUN npm install
COPY . ./
EXPOSE 3000
# run the container
CMD ["node","index.js"]

#for build our docker image : docker build .
#with second build docker image every thing gonna be faster because caching
# for see list of images : docker image ls
# for remove an existion image docker image rm <IMAGE_ID>
# for make a image with name : docker build -t node-app-image .

#now for make a docker container from this node-app-image : docker run -d --name node-app node-app-image
#docker ps for see all running container
#docker rm <NAME_OF_CONTAIENR> -f for delete a continer