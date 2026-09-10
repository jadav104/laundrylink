# Multi-stage Dockerfile for LaundryHub Java Spring Boot Backend
# Stage 1: Build stage using Maven 3.9.6 & OpenJDK 17 (matching pom.xml java.version=17)
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Lightweight Production Runtime stage using Eclipse Temurin Java 17 JRE
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/laundryhub-backend-1.0.0-SNAPSHOT.jar app.jar

# Spring Boot listens on ${PORT:8080} and binds to 0.0.0.0
ENV PORT=8080
EXPOSE 8080

# Start Spring Boot application using java -jar
ENTRYPOINT ["java", "-jar", "app.jar"]
