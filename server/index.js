const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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
let noticesCollection;

async function run() {
  try {
    await client.connect();
    const db = client.db('chitkaraconnect');
    studentsCollection = db.collection('students');
    teachersCollection = db.collection('teachers');
    adminsCollection = db.collection('admins');
    noticesCollection = db.collection('notices');  // Add notices collection
    console.log("Connected to MongoDB and ready to handle requests!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.use(cors({ credentials: true, origin: 'http://localhost:5173' })); // Allow credentials for CORS
app.use(bodyParser.json());
app.use(cookieParser()); // Parse cookies

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = decoded; // Attach decoded JWT to request object
    next(); // Proceed to next middleware or route handler
  });
};

// Login API (POST request)
app.post('/api/login', async (req, res) => {
  const { userId, password } = req.body;
  console.log("Received login attempt with userId:", userId, "and password:", password);

  try {
    const userIdInt = parseInt(userId, 10);
    const passwordInt = parseInt(password, 10);

    if (isNaN(userIdInt) || isNaN(passwordInt)) {
      console.log("Invalid userId or password format");
      return res.status(400).json({ message: 'Invalid userId or password format' });
    }

    // Check student collection
    let user = await studentsCollection.findOne({ RollNo: userIdInt });
    if (user) {
      if (user.password !== passwordInt) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user._id, role: 'student', RollNo: user.RollNo, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.cookie('authToken', token, {
        httpOnly: true,
        secure: false, // Set to true for production with HTTPS
        maxAge: 3600000 // 1 hour
      });

      return res.json({ token, role: 'student' });
    }

    // Check teacher collection
    user = await teachersCollection.findOne({ teacherId: userIdInt });
    if (user) {
      if (user.password !== passwordInt) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user._id, role: 'teacher', teacherId: user.teacherId, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.cookie('authToken', token, {
        httpOnly: true,
        secure: false, // Set to true for production with HTTPS
        maxAge: 3600000 // 1 hour
      });

      return res.json({ token, role: 'teacher' });
    }

    return res.status(401).json({ message: 'User not found' });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// User Details API (GET request) - Protected Route
app.get('/api/user-details', authenticateJWT, async (req, res) => {
  console.log('Request received at /api/user-details');
  const { user } = req;  // The user data comes from the decoded JWT

  try {
    let dbUser;
    if (user.role === 'student') {
      dbUser = await studentsCollection.findOne({ _id: user.userId });
    } else if (user.role === 'teacher') {
      dbUser = await teachersCollection.findOne({ _id: user.userId });
    }

    if (!dbUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userDetails = {
      name: dbUser.name,
      email: dbUser.email,
      RollNo: dbUser.RollNo || dbUser.teacherId, // Assuming RollNo for students, teacherId for teachers
    };

    res.json(userDetails); // Sends the details to the frontend
  } catch (error) {
    console.error('JWT Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
});



// POST route to create a notice
app.post('/api/create-notice', async (req, res) => {
  // Extract the 'type' and 'data' from the request body
  const { type, data } = req.body;  // Expect 'type' (mentorNotice, eventNotice, generalNotice) and 'data' (form data)

  let tag = '';

  // Determine the tag based on the type of notice
  switch (type) {
    case 'mentorNotice':
      tag = 'mentornotice';
      break;
    case 'eventNotice':
      tag = 'event';
      break;
    case 'generalNotice':
      tag = 'notice';
      break;
    default:
      return res.status(400).json({ message: 'Invalid notice type' });
  }

  // Prepare the notice document to be inserted into the database
  const noticeData = { ...data, tag };

  try {
    // Insert the notice data into the 'notices' collection in MongoDB
    const result = await noticesCollection.insertOne(noticeData);
    
    // Return a response with the success message and the inserted notice ID
    res.status(201).json({ message: 'Notice created successfully', noticeId: result.insertedId });
  } catch (error) {
    // Log the error and return a 500 status if there was an issue inserting the notice
    console.error('Error creating notice:', error);
    res.status(500).json({ message: 'Error creating notice' });
  }
});



// API to fetch event notices (GET request)
app.get('/api/get-events', async (req, res) => {
  try {
    // Query the database to get notices with the tag 'event'
    const eventNotices = await noticesCollection.find({ tag: 'event' }).toArray();

    // Return the event notices as a JSON response
    res.json(eventNotices);
  } catch (error) {
    console.error('Error fetching event notices:', error);
    res.status(500).json({ message: 'Error fetching event notices' });
  }
});

app.get("/api/get-mentor-notices", async (req, res) => {
  try {
    const eventNotices = await noticesCollection.find({ tag: 'mentornotice' }).toArray();
    res.json(eventNotices);
     // Send mentor notices as JSON response
  } catch (error) {
    console.error("Error fetching mentor notices:", error);
    res.status(500).json({ message: "Error fetching mentor notices" });
  }
});

app.get("/api/get-notices", async (req, res) => {
  try {
    const eventNotices = await noticesCollection.find({ tag: 'notice' }).toArray();
    res.json(eventNotices);
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({ message: "Error fetching notices" });
  }
});





// Logout API (Clear Cookie)
app.post('/api/logout', (req, res) => {
  res.clearCookie('authToken');
  return res.status(200).json({ message: 'Logged out successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
