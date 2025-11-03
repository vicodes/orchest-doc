ARG DOCKER_REGISTRY_URL="mtr.devops.telekom.de"
ARG DOCKER_REGISTRY_BASE_GROUP=community
ARG DOCKER_REGISTRY_BASE_IMAGE=nginx:1.27

FROM ${DOCKER_REGISTRY_URL}/${DOCKER_REGISTRY_BASE_GROUP}/${DOCKER_REGISTRY_BASE_IMAGE}
ARG DOCKER_IMAGE_EXPIRES="never"
LABEL quay.expires-after=${DOCKER_IMAGE_EXPIRES}
COPY build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]