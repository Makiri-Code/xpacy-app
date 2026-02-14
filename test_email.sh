#!/bin/bash
BASE_URL="https://app.xpacy.com"

# Minimal payload based on handleContact
# The endpoint is /contact/send-mail
# Expected payload likely includes name, email, subject, message

echo "Testing send-mail endpoint..."

curl -X POST "$BASE_URL/contact/send-mail" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin Invite Test",
    "email": "admin@xunnatech.com", 
    "phone": "0000000000",
    "subject": "Invitation to join Xpacy",
    "message": "You have been invited to become a property owner."
  }'

echo -e "\nDone."
