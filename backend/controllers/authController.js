const User = require('../models/User');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
    }

    // Create session
    req.session.userId = user._id;

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ status: 'fail', message: 'Not logged in' });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Default session cookie name
    res.status(200).json({ status: 'success', message: 'Logged out successfully' });
  });
};

exports.protect = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ status: 'fail', message: 'Unauthorized. Please log in.' });
  }
  next();
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, password, passwordConfirm } = req.body;

    if (!currentPassword || !password || !passwordConfirm) {
      return res.status(400).json({ status: 'fail', message: 'Please provide current and new passwords' });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ status: 'fail', message: 'Passwords do not match' });
    }

    // 1. Get user from session
    const user = await User.findById(req.session.userId).select('+password');

    // 2. Check if currentPassword is correct
    if (!(await user.correctPassword(currentPassword, user.password))) {
      return res.status(401).json({ status: 'fail', message: 'Invalid current password' });
    }

    // 3. Update password
    user.password = password;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully'
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
