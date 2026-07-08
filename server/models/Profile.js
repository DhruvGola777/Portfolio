const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  narrative: {
    type: String,
    default: "I build systems for real businesses. I'm a developer focused on the MERN stack, turning complex problems into elegant, scalable digital experiences. My goal is to build things that matter."
  },
  stats: [{
    value: String,
    label: String
  }],
  skillCategories: [{
    title: String,
    skills: String,
    description: String
  }],
  marqueeSkills: [{
    type: String
  }],
  githubUsername: {
    type: String,
    default: ''
  },
  resumeUrl: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Profile', profileSchema);
