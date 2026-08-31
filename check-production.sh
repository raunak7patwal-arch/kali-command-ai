#!/data/data/com.termux/files/usr/bin/bash

BASE_URL="${1:-http://127.0.0.1:3000}"

echo "=================================="
echo "KALI COMMAND AI — HEALTH CHECK"
echo "=================================="

echo
echo "URL: $BASE_URL"

echo
echo "HEALTH:"
curl -s --max-time 20 "$BASE_URL/api/health"

echo
echo
echo "YOUTUBE:"
curl -s --max-time 20 "$BASE_URL/api/youtube/status"

echo
echo
echo "DONE"
