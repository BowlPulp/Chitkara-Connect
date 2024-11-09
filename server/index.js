const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 3000;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let studentsCollection;
let teachersCollection;
let adminsCollection;

// Connect to MongoDB and initialize the students collection
async function run() {
  try {
    await client.connect();
    const db = client.db('chitkaraconnect');
    studentsCollection = db.collection('students');
    teachersCollection = db.collection('teachers');
    adminsCollection = db.collection('admins');
    console.log("Connected to MongoDB and ready to handle requests!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.use(cors());
app.use(bodyParser.json());



app.post('/api/login', async (req, res) => {
    const { userId, password } = req.body;
    console.log("Received login attempt with userId:", userId, "and password:", password);
  
    try {
      if (!studentsCollection || !teachersCollection) {
        console.log("Database collection not initialized.");
        return res.status(500).json({ message: "Database not initialized" });
      }
  
      // Parse userId and password to integers
      const userIdInt = parseInt(userId, 10);
      const passwordInt = parseInt(password, 10);
  
      if (isNaN(userIdInt) || isNaN(passwordInt)) {
        console.log("Invalid userId or password format");
        return res.status(400).json({ message: 'Invalid userId or password format' });
      }
  
      // Check for student first
      let user = await studentsCollection.findOne({ RollNo: userIdInt });
      if (user) {
        // Check if student password matches
        if (user.password !== passwordInt) {
          console.log("Incorrect student password");
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log("Student login successful");
        return res.json({
          message: 'Student login successful',
          token: 'fake-jwt-token',
          redirectUrl: `/student/${user._id}${user.RollNo}`,
          role: 'student',
          userId: user._id,
          RollNo: user.RollNo
        });
      }
  
      // If student not found, check for teacher
      user = await teachersCollection.findOne({ teacherId: userIdInt });
      if (user) {
        // Check if teacher password matches
        if (user.password !== passwordInt) {
          console.log("Incorrect teacher password");
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log("Teacher login successful");
        return res.json({
          message: 'Teacher login successful',
          token: 'fake-jwt-token',
          redirectUrl: `/teacher/${user._id}${user.teacherId}`,
          role: 'teacher',
          userId: user._id,
          teacherId: user.teacherId
        });
      }
  
      // If neither student nor teacher found
      console.log("User not found");
      return res.status(401).json({ message: 'User not found' });
  
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


