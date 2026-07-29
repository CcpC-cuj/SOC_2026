const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Mock database storage (Replace with MongoDB / PostgreSQL models)
let PENDING_DB = [
  { id: 1, title: "DBMS Complete Notes Unit 5", by: "Rahul K.", subject: "DBMS", subjectColor: "purple", type: "Notes", date: "Today" },
  { id: 2, title: "ML Lab Manual — All 12 Experiments", by: "Sneha M.", subject: "ML", subjectColor: "teal", type: "Lab", date: "Today" },
  { id: 3, title: "OS Mid Sem 2023 Question Paper", by: "Arjun J.", subject: "OS", subjectColor: "green", type: "PYQ", date: "Yesterday" },
];

let STUDENTS_DB = [
  { name: "Aryan Kumar", rollno: "23CUCSE001", sem: "5", resume: { fileName: "Aryan_Kumar_Resume.pdf", uploaded: "12 Jul 2026", size: "412 KB" } },
  { name: "Rahul Kumar", rollno: "23CUCSE014", sem: "5", resume: { fileName: "Rahul_K_CV.pdf", uploaded: "08 Jul 2026", size: "380 KB" } },
  { name: "Sneha Mehta", rollno: "23CUCSE022", sem: "5", resume: { fileName: "Sneha_Mehta_Resume.docx", uploaded: "02 Jul 2026", size: "290 KB" } },
  { name: "Arjun Jha", rollno: "23CUCSE009", sem: "5", resume: null },
];

// 1. Get Pending Approvals
app.get('/api/admin/pending', (req, res) => {
  res.json(PENDING_DB);
});

// 2. Handle Approve / Reject action
app.post('/api/admin/pending/:id/:action', (req, res) => {
  const { id, action } = req.params;
  PENDING_DB = PENDING_DB.filter(item => item.id !== parseInt(id));
  // Add database logic here to update item status to 'approved' or 'rejected'
  res.json({ success: true, message: `Item successfully ${action}d` });
});

// 3. Get Student Resumes List
app.get('/api/admin/students', (req, res) => {
  res.json(STUDENTS_DB);
});

// 4. Download Resume Endpoint
app.get('/api/admin/resume/download/:rollno', (req, res) => {
  const { rollno } = req.params;
  const student = STUDENTS_DB.find(s => s.rollno === rollno);
  if (!student || !student.resume) return res.status(404).send("Resume not found");
  
  // Example: Send file from local uploads folder
  // const filePath = path.join(__dirname, 'uploads', student.resume.fileName);
  // res.download(filePath);
  
  res.send(`Downloading resume for ${student.name}`);
});

app.listen(5000, () => {
  console.log("Backend server running on http://localhost:5000");
});