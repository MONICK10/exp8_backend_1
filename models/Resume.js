const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    skills: [{
        type: String
    }],
    education: [{
        institution: String,
        degree: String,
        field: String,
        year: String
    }],
    experience: [{
        company: String,
        position: String,
        duration: String,
        description: String
    }],
    objective: {
        type: String,
        required: true
    },
    projects: [{
        name: String,
        description: String,
        technologies: [String]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resume', resumeSchema);