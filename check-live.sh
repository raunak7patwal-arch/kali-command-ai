#!/data/data/com.termux/files/usr/bin/bash

URL="https://kali-command-ai.onrender.com/api/health"

echo "=========================================="
echo "KALI COMMAND AI - LIVE STATUS"
echo "=========================================="

curl -sS --max-time 30 "$URL"

echo
echo
echo "=========================================="
echo "EXPECTED AFTER DATABASE SETUP:"
echo '"databaseConfigured":true'
echo '"persistentStorage":true'
echo "=========================================="
