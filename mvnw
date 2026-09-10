#!/usr/bin/env bash
set -e

# 1. Ensure OpenJDK 17 is available
if ! command -v java >/dev/null 2>&1 && [ -z "$JAVA_HOME" ]; then
    JDK_DIR="/tmp/jdk-17"
    if [ ! -d "$JDK_DIR" ]; then
        echo "Downloading & Installing OpenJDK 17 for Render build..."
        mkdir -p /tmp/jdk_download
        curl -sSL "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jdk_x64_linux_hotspot_17.0.10_7.tar.gz" | tar -xz -C /tmp/jdk_download
        mv /tmp/jdk_download/jdk-17* /tmp/jdk-17
        rm -rf /tmp/jdk_download
    fi
    export JAVA_HOME="/tmp/jdk-17"
    export PATH="$JAVA_HOME/bin:$PATH"
fi

if [ -n "$JAVA_HOME" ] && [ -d "$JAVA_HOME" ]; then
    export PATH="$JAVA_HOME/bin:$PATH"
fi

# 2. Ensure Maven is available
if command -v mvn >/dev/null 2>&1; then
    exec mvn "$@"
else
    MAVEN_VERSION="3.9.6"
    MAVEN_DIR="/tmp/apache-maven-${MAVEN_VERSION}"
    if [ ! -d "$MAVEN_DIR" ]; then
        echo "Downloading & Installing Maven ${MAVEN_VERSION}..."
        mkdir -p /tmp/mvn_download
        curl -sSL "https://archive.apache.org/dist/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz" | tar -xz -C /tmp/mvn_download
        mv /tmp/mvn_download/apache-maven-${MAVEN_VERSION} /tmp/apache-maven-${MAVEN_VERSION}
        rm -rf /tmp/mvn_download
    fi
    exec "${MAVEN_DIR}/bin/mvn" "$@"
fi
