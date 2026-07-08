require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio');
    
    // Check if admin exists
    let user = await User.findOne({ username: 'admin' });
    if (user) {
      console.log('Admin user already exists!');
      process.exit();
    }

    // Create new admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    user = new User({
      username: 'admin',
      password: hashedPassword
    });

    await user.save();
    console.log('✅ Admin user created! Username: admin | Password: admin123');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
