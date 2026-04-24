import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import DoctorDashboard from '../models/DoctorDashboard.js';
import HospitalAdminData from '../models/HospitalAdminData.js';
import DashboardHomeData from '../models/DashboardHomeData.js';

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let profile;
    const baseSlug = email.split('@')[0];
    const uniqueSuffix = Date.now();
    
    switch (role) {
      case 'doctor': {
        const defaultDoc = await DoctorDashboard.findOne({ slug: 'default' }).lean();
        delete defaultDoc._id; delete defaultDoc.slug;
        profile = new DoctorDashboard({ ...defaultDoc, slug: `doctor-${baseSlug}-${uniqueSuffix}` });
        break;
      }
      case 'hospital-admin': {
        const defaultAdmin = await HospitalAdminData.findOne({ slug: 'default' }).lean();
        delete defaultAdmin._id; delete defaultAdmin.slug;
        profile = new HospitalAdminData({ ...defaultAdmin, slug: `admin-${baseSlug}-${uniqueSuffix}` });
        break;
      }
      case 'patient':
      default: {
        const defaultPatient = await DashboardHomeData.findOne({ slug: 'default' }).lean();
        delete defaultPatient._id; delete defaultPatient.slug;
        profile = new DashboardHomeData({ ...defaultPatient, slug: `patient-${baseSlug}-${uniqueSuffix}` });
        break;
      }
    }
    await profile.save();

    const user = await User.create({
      name,
      email,
      password,
      role,
      doctorProfile: role === 'doctor' ? profile._id : null,
      hospitalAdminProfile: role === 'hospital-admin' ? profile._id : null,
      patientProfile: role === 'patient' ? profile._id : null,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

export default router;
