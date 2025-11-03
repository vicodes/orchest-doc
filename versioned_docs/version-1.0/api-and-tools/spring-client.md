---
sidebar_position: 1
---

# Spring client


## Client setup

### Add below dependency to your build

```java
implementation 'com.orchest.platform:spring-orchest-client:1.2.4'
```

### Configuration

There are two ways to enable a library:
```java
//1
@ComponentScan({"com.platform.orchest"})

//2
@EnableOrchest
```

### Application YAML properties
```yaml
orchest:
  enableWorkers: true
  processIds:
    - pom-mobile-business-process
  bootstrapServers: localhost:9092
  workerThreadCount: 5
  securityProtocol: PLAIN_TEXT
  enable-encryption: false
  aws:
    iamRoleARN: iam_role_arn
    kmsKeyARN: kms_key_arn
```

### Sample worker code

```java
package com.orchest.platform.test;

import com.orchest.platform.client.TaskResponse;
import com.orchest.platform.client.annotations.ActivatedJob;
import com.orchest.platform.client.annotations.JobClient;
import com.orchest.platform.client.annotations.JobWorker;
import com.orchest.platform.client.annotations.Worker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Worker
public class TestWorker {

    @JobWorker(type = "test-worker")
    public TaskResponse testWorker(JobClient jobClient, ActivatedJob activatedJob) {
        System.out.println(activatedJob.getWorker() + " executed");
        return TaskResponse.builder().build();
    }

}

```

## Properties Description

| SNo. | Property                  | Type    | Description                                                        | SampleValue                |
|------|---------------------------|---------|--------------------------------------------------------------------|----------------------------|
| 1    | orchest.enableWorkers     | boolean | To enable all workers                                              | true                       |
| 2    | orchest.processIds        | String  | BPMN Process Id/s whose workers are implement in the service       | mobile-acquisition-process |
| 3    | orchest.bootstrapServers  | String  | Kafka Bootstrap URL                                                |                            |
| 4    | orchest.workerThreadCount | int     | Concurrency for the worker Consumer                                | 5                          |
| 5    | orchest.securityProtocol  | String  | Kafka AUTH protocol (PLAIN_TEXT, SASL_SSL)                         | PLAIN_TEXT(Default)        |
| 6    | orchest.enable-encryption | boolean | Enabled the Kafka Payload encryption                               | false(default)             |
| 7    | orchest.aws.iamRoleARN    | String  | IAM Role arn where the kafka is aded in the role                   |                            |
| 8    | orchest.aws.kmsKeyARN     | String  | KMS key arn from which the payload will be decrypted and encrypted |                            |


## Below listed are the functions to perform individual tasks

---
### To get Variables use the ActivatedJob object injected in worker method params

```java
    // To get variable of a class type for the key  
    SomeObject someObject = job.getVariablesAsType("someObjectVariableKey", SomeObject.class);
```

```java
    // To get variable of a TypeReference/Generics type for the key
    Variables<SomeDTO> variables = job.getVariablesAsType("variables", new TypeReference<>() {});
```

```java
    // To get all the variables as Map
    Map<String, Object> variablesMap = job.getVariablesMap();
```

```java
    // To get all the variables as JSON String
    String variablesJsonString = job.getVariables();
```

---
### To complete the task with variables

```java
    // To upsert the variables map use this below method
    return TaskResponse.builder().variable(variablesMap).build();     
```

```java
    // To upsert a specific variable in variables use this below method
    return TaskResponse.builder().variable("apiResponse", someApiResponse).build();
```

```java
    // To upsert a specific variable in variables without key use this below method
    // The key will be the class simple name 
    return TaskResponse.builder().variable(someNewObject).build();
```

```java
    // To perform specific operation on variables please use this below method 
    Variables variables = Variables
                .builder()
                .action(Variables.VariableAction.DELETE)
                .variables(Map.of("someKey", "data")).build();
    return TaskResponse.builder().variable(variables).build();
```

---

### To send Error event on task completion

```java
    return TaskResponse.builder()
                    .variable(variables) // any variables if any
                    .errorEvent("{YOUR_ERROR_NAME}", "{YOUR_ERROR_CODE}", exceptionObject)
                    .build();
```

---

### To send Message event on woerk completion

```java
    return TaskResponse.builder()
    .messageEvent("{YOUR_MESSAGE_NAME}", "{MESSAGE_CORRELATION}", variables)
    .build();
```

### To send Message event from Worker

```java
    // use the JobClient object to send the message event 
    jobClient.sendMessageEvent("{YOUR_MESSAGE_NAME}", "{MESSAGE_CORRELATION}", variables);

```

---

### To retry a worker

```java
    // throw this Exception class from the worker to do the immediate retry 
    throw new RetryableException("{YOUR_ERROR_MESSAGE}", retriesCount);

    // same for progressive retry with backoff duration
    throw new RetryableException("{YOUR_ERROR_MESSAGE}", retriesCount, backOffDuration);
```



