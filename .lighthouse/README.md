# Lighthouse and Headless Chromium

- https://github.com/GoogleChrome/lighthouse/blob/main/readme.md#using-the-node-module
- https://github.com/GoogleChrome/lighthouse/blob/main/docs/readme.md#using-programmatically
- https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md
- https://github.com/GoogleChrome/lighthouse/blob/main/docs/user-flows.md
- https://github.com/cloudfour/lighthouse-parade
- https://github.com/github/lightcrawler
- https://github.com/GoogleChrome/lighthouse-ci

## Running Lighthouse With Headless Chrome

- https://github.com/GoogleChrome/lighthouse/blob/main/docs/headless-chrome.md#running-lighthouse-using-headless-chrome
- https://github.com/GoogleChrome/lighthouse/blob/main/docs/readme.md#using-programmatically
- https://github.com/GoogleChrome/lighthouse#using-the-node-cli

## Installing Headless Chromium

- https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
- https://blog.logrocket.com/setting-headless-chrome-node-js-server-docker/

### From GH Copilot:

```
# Start with a base image that has Node.js installed
FROM node:14

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

# Clean up
RUN apt-get purge --auto-remove -y curl gnupg \
    && rm -rf /var/lib/apt/lists/*
```
