# --- STAGE 1: Build Java Spring Boot Application ---
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy repository context
COPY . .

# Build jar (handles both root and backend directory context)
RUN if [ -f "./backend/pom.xml" ]; then cd backend && mvn clean package -DskipTests -B; else mvn clean package -DskipTests -B; fi

# Extract generated JAR file to /app/app.jar
RUN find . -name "*.jar" -not -name "*javadoc*" -not -name "*sources*" -exec cp {} /app/app.jar \;

# --- STAGE 2: Lightweight Runtime Image ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy compiled JAR from build stage
COPY --from=builder /app/app.jar app.jar

# Expose default port
EXPOSE 8080

# Environment variables
ENV PORT=8080
ENV JAVA_OPTS="-Xms256m -Xmx512m"

# Execute application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar --server.port=${PORT}"]
