#!/bin/bash

BASE_URL="https://app.xpacy.com"
EMAIL="admin@xunnatech.com"
PASSWORD="zxcvbnm"

echo "Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/admin/admin-login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")

TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "Login failed."
  exit 1
fi

echo "Token received."

check_path() {
  API_PATH=$1
  STATUS=$(curl -o /dev/null -s -w "%{http_code}" -X GET "$BASE_URL$API_PATH" -H "Authorization: Bearer $TOKEN")
  if [ "$STATUS" != "404" ] && [ "$STATUS" != "500" ]; then
    echo "[FOUND $STATUS] $API_PATH"
  else
    echo "[MISSING $STATUS] $API_PATH"
  fi
}

echo "--- Checking Users ---"
check_path "/admin/fetch-all-users"
check_path "/admin/users/fetch-all"
check_path "/admin/get-all-users"
check_path "/admin/fetch-users-list"
check_path "/user/fetch-all"

echo "--- Checking Payments ---"
check_path "/admin/fetch-all-payments"
check_path "/admin/payments/fetch-all"
check_path "/payment/fetch-all"
check_path "/transaction/fetch-all"

echo "--- Checking Property Owners ---"
check_path "/admin/fetch-property-owners"
check_path "/admin/fetch-all-property-owners"
check_path "/admin/property-owner/fetch-all"
check_path "/property-owner/fetch-all"
check_path "/admin/fetch-propertowners" # Typo guess
check_path "/admin/fetch-propertyowners"

