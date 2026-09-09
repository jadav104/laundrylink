# --- STAGE 1: Build Java Spring Boot Application ---
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy Maven POM and dependency descriptors
COPY pom.xml .

# Download dependencies (cached layer)
RUN mvn dependency:go-offline -B || true

# Copy source code and build executable jar
COPY src ./src
RUN mvn package -DskipTests -B

# --- STAGE 2: Lightweight Runtime Image ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy compiled JAR from build stage
COPY --from=builder /app/target/*.jar app.jar

# Expose default port
EXPOSE 8080

# Environment variables
ENV PORT=8080
ENV JAVA_OPTS="-Xms256m -Xmx512m"

# Execute application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar --server.port=${PORT}"]
