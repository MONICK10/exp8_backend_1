const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');

// Create resume
router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'client') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const resumeData = { ...req.body, userId: req.user.userId };
        const resume = new Resume(resumeData);
        await resume.save();
        
        res.status(201).json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user's resumes
router.get('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'client') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const resumes = await Resume.find({ userId: req.user.userId });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;