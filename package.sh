#!/bin/bash

# Package all files relevant for the browser extension into a .zip file
# Excludes: old archives and .git folder

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
EXTENSION_NAME="quick-ha-mr"
ZIP_FILE="${SCRIPT_DIR}/${EXTENSION_NAME}.zip"

# Create zip file, excluding .git folder and any existing .zip files
cd "$SCRIPT_DIR"
7z a -tzip "$ZIP_FILE" -r * -x!".git"  -x!"*.zip"

if [ $? -eq 0 ]; then
  echo "✓ Package created: $ZIP_FILE"
else
  echo "✗ Failed to create package"
  exit 1
fi