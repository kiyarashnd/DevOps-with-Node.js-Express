# look we downloaded the node image from docker hub and cache that result (baes image)
FROM node:20
# we set the working directory of container and cache result of that
WORKDIR  /app
COPY package.json .
# build the container (if after RUN npm install we set --only=production this not gonna install devdependencies)
# RUN npm install 
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ];\
        then npm install ; \
        else npm install --only=production; \
        fi
#Copy every thing in our current directory to container (./) (here if we have .dockerignore works)
COPY . ./
ENV PORT 3000
EXPOSE $PORT 
# run the container
# CMD ["npm","run","dev"] 
CMD ["node","index.js"]


# for build our docker image : docker build .
# with second build docker image every thing gonna be faster because caching
# for see list of images : docker image ls
# for remove an existion image docker image rm <IMAGE_ID>
# for make a image with name : docker build -t node-app-image .

#now for make a docker container from this node-app-image : docker run -d --name node-app node-app-image
#docker ps for see all running container
#docker rm <NAME_OF_CONTAIENR> -f for delete a continer