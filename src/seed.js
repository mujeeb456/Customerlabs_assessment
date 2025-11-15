// seed.js
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const connectDB = require("./config/db");
const Role = require("./models/Role");

(async () => {
  await connectDB();

  const roles = ["Admin", "Normal"];

  for (const name of roles) {
    const exists = await Role.findOne({ role_name: name });
    if (!exists) {
      await Role.create({ role_name: name });
      console.log("Created:", name);
    }
  }

  console.log("Role seeding completed");
  process.exit(0);
})();
