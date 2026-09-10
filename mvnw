#!/usr/bin/env bash
set -e

if command -v mvn >/dev/null 2>&1; then
    exec mvn "$@"
else
    MAVEN_VERSION="3.9.6"
    MAVEN_DIR="/tmp/apache-maven-${MAVEN_VERSION}"
    if [ ! -d "$MAVEN_DIR" ]; then
        echo "Installing Maven ${MAVEN_VERSION}..."
        mkdir -p /tmp/mvn_download
        curl -sSL "https://archive.apache.org/dist/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz" | tar -xz -C /tmp/mvn_download
        mv /tmp/mvn_download/apache-maven-${MAVEN_VERSION} /tmp/apache-maven-${MAVEN_VERSION}
    fi
    exec "${MAVEN_DIR}/bin/mvn" "$@"
fi
