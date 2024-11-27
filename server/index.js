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

const questions = [
  {
    id: 1,
    question: "What is Chitkara Connect?",
    answer: "Chitkara Connect is a platform enabling students and teachers to interact and access information like notices, events, attendance, and more."
  },
  {
    id: 2,
    question: "Who is Chitkara's Chancellor?",
    answer: "Dr. Ashok Chitkara is the Chancellor of Chitkara University."
  },
  {
    id: 3,
    question: "Where is Chitkara University located?",
    answer: "Chitkara University is located on the Chandigarh-Patiala National Highway (NH-07) in Rajpura, Punjab. It is equidistant from major cities like Chandigarh, Mohali, and Patiala."
  },
  {
    id: 4,
    question: "What programs does Chitkara University offer?",
    answer: "Chitkara University offers programs in business management, engineering, computer science, nursing, hotel management, architecture, and more."
  },
  {
    id: 5,
    question: "When was Chitkara University established?",
    answer: "Chitkara University was established in 2010 under the Chitkara University Act by the Punjab State Legislature."
  },
  {
    id: 6,
    question: "What makes Chitkara University unique?",
    answer: "It is known for quality education, ethical practices, strong industry collaborations, and an emphasis on research and innovation."
  },
  {
    id: 7,
    question: "Does Chitkara University have international collaborations?",
    answer: "Yes, Chitkara University has partnerships with top international universities for student exchange programs, research collaborations, and dual degree programs."
  },
  {
    id: 8,
    question: "What extracurricular activities are available at Chitkara University?",
    answer: "Students can participate in cultural fests, sports events, technical competitions, and social outreach programs organized regularly on campus."
  },
  {
    id: 9,
    question: "What facilities are available at Chitkara University?",
    answer: "The campus has modern classrooms, laboratories, a library, hostels, sports complexes, and cafeterias, ensuring a holistic learning environment."
  },
  {
    id: 10,
    question: "What are the placement statistics for Chitkara University?",
    answer: "Chitkara University has a high placement record, with top recruiters from industries like IT, hospitality, healthcare, and management visiting the campus annually."
  },
  {
    id: 11,
    question: "Is Chitkara University accredited?",
    answer: "Yes, Chitkara University is accredited by NAAC and recognized by the UGC, ensuring high standards of education and infrastructure."
  },
  {
    id: 12,
    question: "How can students apply for admission to Chitkara University?",
    answer: "Students can apply through the university's online portal, submitting the required documents and passing eligibility criteria for their chosen program."
  },
  {
    id: 13,
    question: "What is the student-faculty ratio at Chitkara University?",
    answer: "Chitkara University maintains a balanced student-faculty ratio to ensure personalized attention and effective learning for students."
  },
  {
    id: 14,
    question: "Does Chitkara University offer scholarships?",
    answer: "Yes, the university provides merit-based scholarships to deserving students across various programs."
  },
  {
    id: 15,
    question: "What research opportunities are available at Chitkara University?",
    answer: "Chitkara University emphasizes research, offering students and faculty opportunities to work on funded projects, publish papers, and collaborate with industry experts."
  },
  {
    id: 16,
    question: "What is the eligibility for B.Tech at Chitkara University?",
    answer: "Applicants must have completed 10+2 with a minimum of 60% marks in Physics, Chemistry, and Mathematics."
  },
  {
    id: 17,
    question: "What MBA specializations does Chitkara University offer?",
    answer: "Specializations include Marketing, Finance, HR, Operations, and Business Analytics."
  },
  {
    id: 18,
    question: "What is the admission process for nursing programs?",
    answer: "Applicants must have completed 10+2 with Biology as a subject. Admissions are based on merit."
  },
  {
    id: 19,
    question: "What are the benefits of student exchange programs?",
    answer: "Student exchange programs provide global exposure, cultural exchange, and opportunities for advanced research and study."
  },
  {
    id: 20,
    question: "What support services does Chitkara University offer?",
    answer: "Support services include career counseling, on-campus healthcare, psychological support, and financial aid."
  },
  {
    id: 21,
    question: "What events are conducted at Chitkara University?",
    answer: "Events like Udaan, Tech Fest, and sports tournaments are held to enhance the overall student experience."
  },
  {
    id: 22,
    question: "What is the focus of the Engineering program?",
    answer: "Chitkara's Engineering program emphasizes innovation, problem-solving skills, and industry-relevant training."
  },
  {
    id: 23,
    question: "What sustainability initiatives are adopted by Chitkara University?",
    answer: "The university promotes green energy, waste management, and eco-friendly practices across the campus."
  },
  {
    id: 24,
    question: "What is the scope of online learning at Chitkara University?",
    answer: "The university integrates online learning for flexible education and offers industry-relevant certifications."
  },
  {
    id: 25,
    question: "What are the dining facilities at Chitkara University?",
    answer: "Chitkara's campus includes multiple food outlets offering diverse cuisines and ensuring hygienic standards."
  }
];

app.get('/questions', (req, res) => {
res.json(questions);
});

app.get('/api/manage-students', async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await studentsCollection.find({}).toArray();

    // Return the list of students as JSON response
    res.json(students);
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ message: 'Error fetching student details' });
  }
});

app.get('/api/contact-teachers', async (req, res) => {
  try {
    // Fetch all students from the database
    const teachers = await teachersCollection.find({}).toArray();

    // Return the list of students as JSON response
    res.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers details:', error);
    res.status(500).json({ message: 'Error fetching teachers details' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
