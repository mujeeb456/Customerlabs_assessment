🌟 README — Simple & Friendly
📨 Webhook Forwarding Service

This project is a small, clean Node.js service that receives incoming data, stores logs, and forwards the data to all webhook destinations tied to an account.
Nothing fancy — just straightforward APIs that do exactly what's needed.

🚀 What This Service Can Do

Here’s the quick version of what the app supports:

👤 Authentication (JWT)

Sign up

Log in

Roles: Admin and Normal

🏢 Accounts

Create accounts

List accounts

Delete accounts

Every account gets its own app_secret_token

👥 Members

Admins can add members to accounts

Assign Admin / Normal roles to users

🎯 Destinations

Add webhook destinations

List destinations per account

📥 Incoming Webhook Receiver

Accept incoming JSON at /incoming_data

Validates headers

Saves the request as pending log

Pushes the job to a queue (Bull)

Worker forwards data to all destinations

📜 Logs (New!)

Get all logs

Filter by event_id, status, account_id, destination_id

Works for both Admin + Normal users

Logs include account info & destination info

🔧 Tech Used

Node.js + Express

MongoDB + Mongoose

Redis + Bull Queue

Axios

Swagger UI

All clean and kept as simple as possible.

🛠 How to Run
1️⃣ Install dependencies
npm install

2️⃣ Start Redis (required for queue)

If you're on Linux/Mac:

redis-server


If you're using Docker:

docker run -p 6379:6379 redis

3️⃣ Seed roles (Admin + Normal)
node seed.js

4️⃣ Start the app
npm start

5️⃣ Start the worker
node workers/sendWorker.js

🧪 Testing Notes

Use Postman

Always log in and get a JWT token before hitting protected routes

For /incoming_data, send headers:

CL-X-TOKEN = account secret token

CL-X-EVENT-ID = unique event id

🧩 A Tiny Example
Create an Account
POST /accounts
{
  "account_name": "CoolApp",
  "website": "https://coolapp.io"
}

Add Destination
POST /destinations
{
  "accountId": "<account_id>",
  "url": "https://webhook.site/123",
  "method": "POST"
}

Send Incoming Data

Headers:

CL-X-TOKEN: <app_secret_token>
CL-X-EVENT-ID: 777


Body:

{
  "message": "Hello, world!"
}


→ The job goes into queue → Worker forwards → Logs created.

📜 Get Logs (New Feature!)
GET /logs
Authorization: Bearer <token>


Filters:

/logs?status=success
/logs?event_id=123
/logs?account_id=acc-123

🎉 That’s it!

If you're setting this up for an assessment or review, this README should be more than enough for anyone to understand the project quickly without drowning in corporate jargon.

If you want a "Quick Start" setup script, or a Postman Collection, just let me know — happy to create it.