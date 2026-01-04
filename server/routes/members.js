const router = require('express').Router();
const Member = require('../models/Member');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// --- DEBUG: Check Env Vars on Load ---
console.log("---------------------------------------");
console.log("Initializing Members Route...");
console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "✅ Loaded" : "❌ MISSING");
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY ? "✅ Loaded" : "❌ MISSING");
console.log("Cloudinary API Secret:", process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ MISSING");
console.log("---------------------------------------");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'codechef-wce-team',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage: storage });

// GET All Members
router.get('/', async (req, res) => {
  console.log("GET /api/members request received");
  try {
    const members = await Member.find().sort({ yearOfPassing: -1 });
    console.log(`Found ${members.length} members`);
    res.json(members);
  } catch (err) {
    console.error("GET Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST New Member
router.post('/add', upload.single('image'), async (req, res) => {
  console.log("POST /api/members/add request received");

  // 1. Check if Image Upload Middleware worked
  if (req.file) {
    console.log("✅ Image uploaded to Cloudinary:", req.file.path);
  } else {
    console.log("⚠️ No image file received (or upload failed silently)");
  }

  // 2. Check Data
  console.log("📦 Form Data received:", req.body);

  try {
    const { name, yearOfPassing, board, post, linkedin, github, codechef } = req.body;
    
    const imageUrl = req.file ? req.file.path : "https://via.placeholder.com/150";

    const newMember = new Member({
      name,
      yearOfPassing,
      board,
      post,
      imageUrl,
      linkedin,
      github,
      codechef
    });

    console.log("💾 Attempting to save to MongoDB...");
    await newMember.save();
    console.log("✅ Member saved successfully!");

    res.status(201).json(newMember);
  } catch (err) {
    console.error("❌ ERROR inside POST route:");
    console.error(err); // This prints the full error object
    res.status(400).json({ error: 'Error adding member', details: err.message });
  }
});

// ... (Your existing imports: router, Member, multer, cloudinary, storage)

// POST /register (Alias for adding a member)
// This matches: http://localhost:5000/api/members/register
router.post('/register', upload.single('image'), async (req, res) => {
  console.log("POST /api/members/register request received");

  try {
    const { name, yearOfPassing, board, post, linkedin, github, codechef } = req.body;
    
    // Check if image uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Profile image is required" });
    }

    const imageUrl = req.file.path;

    const newMember = new Member({
      name,
      yearOfPassing,
      board,
      post,
      imageUrl,
      linkedin,
      github,
      codechef
    });

    await newMember.save();
    console.log("✅ Member Registered Successfully!");
    
    res.status(201).json({ message: "Registration successful!", member: newMember });

  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ error: 'Error registering member', details: err.message });
  }
});

module.exports = router;