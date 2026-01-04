#!/bin/bash

# Simple script to update the service worker cache version
# Run this before deploying when you want to force a cache update

# Generate new version with current date and time
NEW_VERSION=$(date +"%Y-%m-%d-%H%M%S")

# Update the version in service-worker.js
sed -i "s/const CACHE_VERSION = '.*';/const CACHE_VERSION = '$NEW_VERSION';/" service-worker.js

echo "✅ Cache version updated to: $NEW_VERSION"
echo "📝 Please commit and deploy the changes"
