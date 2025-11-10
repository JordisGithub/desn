# Multi-stage Dockerfile for backend
FROM maven:3.9.11-eclipse-temurin-21 AS builder
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN mvn -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /workspace/target/proxy-backend-0.0.1-SNAPSHOT.jar ./app.jar
EXPOSE 8080
ENV JAVA_OPTS="-Dspring.profiles.active=prod"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
