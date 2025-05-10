const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User =require('../db/User')
const Activity=require('../db/Activity')
const Booking =require('../db/Bookings')


exports.register = async (req, res) => {
    const { name, email, phonenumber, password } = req.body;
  
    if (!name || !email || !phonenumber || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      user = new User({
        name,
        email,
        phonenumber,
        password: hashedPassword
      });
  
      await user.save();
  
      res.status(201).json({ message: 'Registration successful' });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  exports.login = async (req, res) => {
    console.log(req.body)

    try {
        const { email, password } = req.body;
        console.log(req.body)
        const users = await User.findOne({ email });
        if (!users) {
            return res.status(401).json({ message: "No user found" });
        }

        const match = await bcrypt.compare(password, users.password);
        if (match) {
            const token = jwt.sign({ user_id: users._id }, process.env.PRIVATE_KEY, { expiresIn: "1d" });
            res.status(200).json({ message: "Login successful", token });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.createActivity = async (req, res) => {
  
  
    try {
      const { title, description, location, dateTime } = req.body;
  
      const newActivity = new Activity({
        title,
        description,
        location,
        dateTime: new Date(dateTime)
      });
  
      const activity = await newActivity.save();
      res.json(activity);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.getAllActivities = async (req, res) => {
    try {
      const activities = await Activity.find().sort({ dateTime: 1 });
      res.json(activities);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };


  exports.getActivityById = async (req, res) => {
    try {
      const activity = await Activity.findById(req.params.id);
      
      if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
      }
      
      res.json(activity);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Activity not found' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.bookActivity = async (req, res) => {
    try {
      const { activityId } = req.body;
      const userId = req.userId;
  
      const activity = await Activity.findById(activityId);
      if (!activity) return res.status(404).json({ message: 'Activity not found' });
  
      const existingBooking = await Booking.findOne({ user: userId, activity: activityId });
      if (existingBooking) {
        return res.status(400).json({ message: 'You have already booked this activity' });
      }
  
      const newBooking = new Booking({ activity: activityId, user: userId });
      const booking = await newBooking.save();
  
      const populatedBooking = await Booking.findById(booking._id).populate('activity');
      res.json(populatedBooking);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
exports.getUserBookings = async (req, res) => {
    try {
      const userId = req.userId;
  
      const bookings = await Booking.find({ user: userId }).populate('activity');
  
      res.json(bookings);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };