#!/bin/bash

BASE_URL="https://app.xpacy.com"

# --- LOGIN SECTION ---
EMAIL="admin@xunnatech.com"
PASSWORD="zxcvbnm"

echo "----------------------------------------------------------------"
echo "1. Logging in Admin..."
LOGIN_RESPONSE=$(curl -v -X POST "$BASE_URL/admin/admin-login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}" 2>&1)

echo "Login Output:"
echo "$LOGIN_RESPONSE"

TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# ------------------------------------------------------------------

# Default Dummy Token for Reachability Testing
if [ -z "$TOKEN" ]; then
  TOKEN="dummy-admin-token"
  echo "Using Dummy Token: $TOKEN"
fi

echo "----------------------------------------------------------------"

auth_curl() {
  ENDPOINT=$1
  METHOD=${2:-GET}
  echo "Testing $METHOD $ENDPOINT..."
  RESPONSE=$(curl -s -X "$METHOD" "$BASE_URL$ENDPOINT" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json")
    
  echo "Raw Response:"
  echo "$RESPONSE" | head -c 500 # Truncate long responses
  echo "..."
  echo "Parsed Status:"
  # Just try to parse status or success field to see if it's JSON
  echo "$RESPONSE" | jq '.success, .message' 2>/dev/null || echo "Not valid JSON or error"
  echo "----------------------------------------------------------------"
}

auth_curl "/admin/fetch-admin-profile"

echo "--- Properties ---"
auth_curl "/admin/fetch-all-propreties" # Current
auth_curl "/admin/fetch-all-properties" # Typo fix?
auth_curl "/admin/properties/fetch-all-properties" 

echo "--- Services ---"
auth_curl "/service/fetch-services"
auth_curl "/admin/fetch-services"

echo "--- Payments (Retrying with guesses) ---"
auth_curl "/admin/payments"
auth_curl "/payment/get-all-payments"
auth_curl "/period/fetch-payments"

echo "--- Property Owners (Retrying with guesses) ---"
auth_curl "/admin/fetch-property-owners"
auth_curl "/admin/property-owners"
auth_curl "/property-owner/get-all"

echo "--- Users (Retrying with guesses) ---"
auth_curl "/admin/fetch-all-users"
auth_curl "/admin/users"
auth_curl "/user/get-all-users"


echo "--- Service Providers ---"
auth_curl "/admin/service-providers"

echo "Done."
