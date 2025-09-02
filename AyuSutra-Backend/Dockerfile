# Use official Java 21 JDK image
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (offline build)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Package app
RUN ./mvnw clean package -DskipTests

# Expose default Spring Boot port
EXPOSE 8080

# Run Spring Boot JAR
CMD ["java", "-jar", "target/*.jar"]
