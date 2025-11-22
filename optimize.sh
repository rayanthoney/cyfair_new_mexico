#!/bin/bash

# This script converts all PNG and JPG images in the public/images directory
# to WebP format, which can significantly reduce their file size.

# Create a directory for the new WebP images if it doesn't exist
mkdir -p public/images/webp

# Find all PNG and JPG images and convert them to WebP
for img in public/images/*.{png,jpg,jpeg}; do
  if [ -f "$img" ]; then
    filename=$(basename -- "$img")
    extension="${filename##*.}"
    filename_no_ext="${filename%.*}"
    cwebp -q 80 "$img" -o "public/images/webp/$filename_no_ext.webp"
  fi
done

echo 'Image conversion to WebP complete!'
