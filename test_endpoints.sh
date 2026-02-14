#!/bin/bash

BASE_URL="https://app.xpacy.com"
# Skip login as requested
TOKEN="dummy-token-skipped-login"

echo "----------------------------------------------------------------"
echo "Skipping Login. Using Dummy Token: $TOKEN"
echo "----------------------------------------------------------------"

auth_curl() {
  ENDPOINT=$1
  METHOD=${2:-GET}
  echo "Testing $METHOD $ENDPOINT..."
  RESPONSE=$(curl -s -X "$METHOD" "$BASE_URL$ENDPOINT" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json")
  
  echo "Raw Response:"
  echo "$RESPONSE"
  echo "Parsed:"
  echo "$RESPONSE" | jq . 2>/dev/null
  echo "----------------------------------------------------------------"
}

auth_curl "/property-owner/fetch-profile"
auth_curl "/property-owner/fetch-properties"
auth_curl "/property-owner/fetch-services"
auth_curl "/property-owner/fetch-bookings"
auth_curl "/property-owner/fetch-invoices"
auth_curl "/property-owner/fetch-notifications"
auth_curl "/property-owner/fetch-service/1" # Testing with ID 1


# Try to fetch a service by ID if we can parse one, or just try a hardcoded one for now or from the update
# auth_curl "/property-owner/fetch-service/20"

echo "Done."
