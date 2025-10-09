#!/usr/bin/env bash
# Exit on error
set -o errexit

# Create necessary directories
echo "Creating directories..."
mkdir -p staticfiles

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Run migrations
echo "Running migrations..."
python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

echo "Build completed successfully!"