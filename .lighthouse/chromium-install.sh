#!/bin/bash

# remember: chmod +x chromium-install.sh

# Check if Chromium is already installed
if which google-chrome-stable >/dev/null; then
    echo "Chromium (google-chrome-stable) is already installed. Version: $(google-chrome-stable --version)"
    exit 0
fi

# Update the package lists
RUN apt-get update

# Install the necessary dependencies for Google Chrome
RUN apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    --no-install-recommends

# Download and install Google Chrome
RUN curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y \
    google-chrome-stable \
    --no-install-recommends

# Verify that Google Chrome is installed correctly
RUN google-chrome-stable --version
