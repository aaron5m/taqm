#!/usr/bin/env bash

# Exit on error
set -e

ZIP_FILE="site.zip"
ENV_FILE="password.env"
DEST="/var/www/html"

# --- 1. Check if zip file exists ---
if [ ! -f "$ZIP_FILE" ]; then
    echo "Error: $ZIP_FILE not found."
    exit 1
fi

# --- 2. Load ZIP password from password.env ---
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: $ENV_FILE not found."
    exit 1
fi

# POSIX-compatible extraction of ZIP_PASSWORD
ZIP_PASSWORD=$(grep '^ZIP_PASSWORD=' "$ENV_FILE" | sed 's/^ZIP_PASSWORD=//')

if [ -z "$ZIP_PASSWORD" ]; then
    echo "Error: ZIP_PASSWORD not found or empty in $ENV_FILE"
    exit 1
fi

# --- 3. Check if destination exists ---
if [ ! -d "$DEST" ]; then
    echo "Error: Destination directory $DEST does not exist."
    echo "Please create it before running this script."
    exit 1
fi

# --- 4. Create temporary directory ---
TMP_DIR=$(mktemp -d)

# --- 5. Unzip the encrypted archive into temp directory ---
unzip -o -P "$ZIP_PASSWORD" "$ZIP_FILE" -d "$TMP_DIR"

# --- 6. Identify top-level folder in zip ---
TOP_LEVEL_FOLDER=$(ls "$TMP_DIR")

if [ -z "$TOP_LEVEL_FOLDER" ]; then
    echo "Error: Archive seems empty."
    rm -rf "$TMP_DIR"
    exit 1
fi

# --- 7. Move contents only (not the top-level folder) ---
mv "$TMP_DIR/$TOP_LEVEL_FOLDER"/* "$DEST"/

# --- 8. Clean up temporary directory ---
rm -rf "$TMP_DIR"

echo "Site contents have been unpacked into: $DEST"
