@echo off
rem Minimal mvnw.cmd: use local mvn if available, otherwise run Maven inside Docker
where mvn >nul 2>nul
if %errorlevel%==0 (
  mvn %*
  exit /b %errorlevel%
)

echo mvn not found in PATH — using Dockerized Maven to run the command
docker run --rm -v "%cd%":/workspace -w /workspace maven:3.9.11-eclipse-temurin-17 mvn %*
