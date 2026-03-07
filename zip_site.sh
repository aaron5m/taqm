#!/usr/bin/env bash

# Exit on error
set -e

ENV_FILE="password.env"
SOURCE_DIR="site"
OUTPUT_FILE="site.zip"

# Ensure env file exists
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: $ENV_FILE not found"
    exit 1
fi

# Extract ZIP_PASSWORD safely (POSIX-compatible way)
ZIP_PASSWORD=$(grep '^ZIP_PASSWORD=' "$ENV_FILE" | sed 's/^ZIP_PASSWORD=//')

# Check if password is empty
if [ -z "$ZIP_PASSWORD" ]; then
    echo "Error: ZIP_PASSWORD not found or empty in $ENV_FILE"
    exit 1
fi

# Ensure source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Directory $SOURCE_DIR not found"
    exit 1
fi

# Remove old zip if it exists
if [ -f "$OUTPUT_FILE" ]; then
    rm -f "$OUTPUT_FILE"
fi

# Create encrypted zip (recursive)
zip -r -P "$ZIP_PASSWORD" "$OUTPUT_FILE" "$SOURCE_DIR"

echo "Encrypted archive created: $OUTPUT_FILE"

