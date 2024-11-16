require("dotenv").config();
const config = require('./config.json');
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authenticateToken } = require('./utilities');
const User = require("./models/user.model");
const Note = require("./models/note.model");

const app = express();

// Check for required environment variables
if (!process.env.ACCESS_TOKEN_SECRET) {
    console.error("ACCESS_TOKEN_SECRET is missing in .env");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB error:", err.message);
});

app.use(express.json());
app.use(cors({ origin: "*" }));

// Basic route
app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

// Create Account
app.post('/create-account', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({ error: true, message: "Full name is required" });
    }
    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }

    try {
        const isUser = await User.findOne({ email });

        if (isUser) {
            return res.status(409).json({
                error: true,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await user.save();

        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h"  // 1 hour expiration
        });

        return res.status(201).json({
            error: false,
            user,
            accessToken,
            message: "Registration successful"
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Server error",
            details: err.message
        });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        const userInfo = await User.findOne({ email });

        if (!userInfo) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, userInfo.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                error: true,
                message: "Invalid Credentials"
            });
        }

        const accessToken = jwt.sign({ userId: userInfo._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '10h'  // 10 hours expiration
        });

        return res.json({
            error: false,
            message: "Login Successful",
            email,
            accessToken,
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Server error",
            details: err.message
        });
    }
});

// Add Note
app.post('/add-note', authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const userId = req.user.userId;  // Access userId from the token payload

    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }
    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required" });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId,
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error",
            details: error.message
        });
    }
});

app.post('/edit-note/:noteId', authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const userId = req.user.userId;  // Access userId directly

    // Validate that at least one field is provided for the update
    if (!title && !content && !tags && typeof isPinned === 'undefined') {
        return res.status(400).json({ error: true, message: "No changes provided" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId });
        
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        // Update fields if they are present in the request body
        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (typeof isPinned !== 'undefined') note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
        
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
            details: error.message
        });
    }
});

app.get('/get-all-notes', authenticateToken, async (req, res) => {
    const userId = req.user.userId;  // Access userId directly from req.user

    try {
        // Use the correct method name `find`
        const notes = await Note.find({ userId: userId }).sort({ isPinned: -1 });
        return res.json({
            error: false,
            notes,
            message: "All Notes retrieved successfully",
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

app.delete('/delete-note/:noteId', authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const userId = req.user.userId;  // Directly use userId from the authenticated token

    try {
        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        await Note.deleteOne({ _id: noteId, userId });

        return res.json({
            error: false,
            message: "Note deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});



// Start server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

module.exports = app;
