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

echo "--- Step 1: Fetch Property Owners (Required for Form) ---"
echo "Testing endpoint: /admin/property-owner/fetch-propertowner"
STATUS=$(curl -o /dev/null -s -w "%{http_code}" -X GET "$BASE_URL/admin/property-owner/fetch-propertowner" -H "Authorization: Bearer $TOKEN")
RESPONSE=$(curl -s -X GET "$BASE_URL/admin/property-owner/fetch-propertowner" -H "Authorization: Bearer $TOKEN")

if [ "$STATUS" == "200" ]; then
  echo "SUCCESS: Owners fetched."
  # Extract first owner ID if possible
  OWNER_ID=$(echo "$RESPONSE" | grep -o '"id":[^,]*' | head -1 | cut -d':' -f2)
  echo "Found Owner ID: $OWNER_ID"
else
  echo "FAILURE: Could not fetch owners. Status: $STATUS"
  echo "Response: $RESPONSE"
  OWNER_ID="9999" # Dummy ID
fi

echo "--- Step 2: Attempt Property Creation (with Owner ID: $OWNER_ID) ---"
# Create a dummy image file
echo "fake image content" > dummy_image.jpg

# Attempt to create property
RESPONSE=$(curl -s -X POST "$BASE_URL/property/create-property" \
  -H "Authorization: Bearer $TOKEN" \
  -F "property_owner_id=$OWNER_ID" \
  -F "property_name=Test Property $(date +%s)" \
  -F "address=123 Test St" \
  -F "state=Lagos" \
  -F "city=Ikeja" \
  -F "property_type=Residential" \
  -F "availability_status=Available" \
  -F "property_price=1000000" \
  -F "property_status=Sale" \
  -F "description=This is a test property created via script." \
  -F "total_bedrooms=3" \
  -F "total_bathrooms=2" \
  -F "total_toilets=3" \
  -F "parking_area=Fit 2 cars" \
  -F "property_square_area=500" \
  -F "land_area=600" \
  -F "lat=6.5244" \
  -F "long=3.3792" \
  -F "isFeatured=false" \
  -F "images[]=@dummy_image.jpg")

echo "Creation Response: $RESPONSE"

rm dummy_image.jpg
