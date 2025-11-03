---
sidebar_position: 1
---

# Local Installation

## To set up OrchesT locally, Please follow the below instruction

### Prerequisites
- Docker

### Save this file to your system

```yml title="docker-compose.yaml"
version: "3.6"
services:
  kafka:
    image: "confluentinc/cp-kafka:latest"
    ports:
      - "9092:9092"
    container_name: "kafka"
    environment:
      - "KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR=1"
      - "KAFKA_BROKER_ID=1"
      - "KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181"
      - "KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT"
      - "KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092"
      - "KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1"
      - "KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS=0"
      - "KAFKA_TRANSACTION_STATE_LOG_MIN_ISR=1"
      - "CLUSTER_ID="
      - "COMPONENT=kafka"
    networks:
      - shared-network
  zookeeper:
    image: "confluentinc/cp-zookeeper:latest"
    container_name: "zookeeper"
    ports:
      - "2181:2181"
    environment:
      - "ZOOKEEPER_CLIENT_PORT=2181"
      - "ZOOKEEPER_TICK_TIME=2000"
      - "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
      - "container=oci"
      - "LANG=C.UTF-8"
      - "CUB_CLASSPATH=\"/usr/share/java/cp-base-new/*\""
      - "LD_LIBRARY_PATH=/usr/local/lib64:/usr/local/lib:"
      - "COMPONENT=zookeeper"
    networks:
      - shared-network
  mongodb:
    image: "mongo:latest"
    container_name: "mongodb"
    ports:
      - "27017:27017"
    environment:
      - "MONGO_INITDB_ROOT_PASSWORD=secret"
      - "MONGO_INITDB_ROOT_USERNAME=root"
      - "MONGO_INITDB_DATABASE=mydatabase"
      - "MONGO_PACKAGE=mongodb-org"
    networks:
      - shared-network

  process-engine:
    image: mtr.devops.telekom.de/orchest/process-engine
    container_name: process-engine
    #    restart: unless-stopped
    depends_on:
      - mongodb
      - kafka
    ports:
      - "5555:8080"
    environment:
      MONGO_URI: mongodb://mongodb:27017
      KAFKA_BOOTSTRAP_SERVER: kafka:29092
    networks:
      - shared-network

  orchest-rest:
    image: mtr.devops.telekom.de/orchest/orchest-rest
    container_name: orchest-rest
    depends_on:
      - mongodb
      - kafka
    ports:
      - "8081:8080"
    environment:
      MONGO_URI: mongodb://mongodb:27017
      KAFKA_BOOTSTRAP_SERVER: kafka:29092
    networks:
      - shared-network

  sentinel:
    image: mtr.devops.telekom.de/orchest/sentinel
    container_name: sentinel
    depends_on:
      - mongodb
      - kafka
    ports:
      - "4444:8080"
    environment:
      MONGO_URI: mongodb://mongodb:27017
      KAFKA_BOOTSTRAP_SERVER: kafka:29092
    networks:
      - shared-network

  orchest-ui:
    image: mtr.devops.telekom.de/orchest/sentinel
    container_name: orchest-ui
    depends_on:
      - orchest-rest
    ports:
      - "7075:8080"
    environment:
      VITE_BASE_PATH: http://localhost:6200
      VITE_BIPAS_LOGIN: "true"
    networks:
      - shared-network

networks:
  shared-network:
    driver: bridge
    name: shared-network

volumes:
  mongodb-data:
    driver: local
    name: mongo-data
  mongodb-log:
    driver: local
    name: mongo-log
```

### And run the command in same file directory where this file is present
```shell
docker compose -f docker-compose.yaml up -d
```


### Next step is to point your client app to OrchesT's properties kafka value to  `localhost:9092` and you are ready to go