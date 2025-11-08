const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all resumes (admin only)
router.get('/resumes', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        console.log('Admin token:', req.user); // Debug log
        const resumes = await Resume.find()
            .populate('userId', 'fullName email')
            .sort({ createdAt: -1 })
            .lean();

        const formattedResumes = resumes.map(resume => ({
            _id: resume._id,
            name: resume.name,
            email: resume.email,
            createdAt: resume.createdAt,
            userId: resume.userId
        }));
        
        console.log('Fetched resumes:', formattedResumes); // Debug log
        res.json({ data: formattedResumes });
    } catch (error) {
        console.error('Error fetching resumes:', error); // Debug log
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete resume (admin only)
// Get single resume (admin only)
router.get('/resume/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const resume = await Resume.findById(req.params.id)
            .populate('userId', 'username email');
            
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.delete('/resume/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const resume = await Resume.findByIdAndDelete(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;