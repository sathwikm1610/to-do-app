 
const express = require('express');
const { getTasks, addTask } = require('../controllers/taskController');
const router = express.Router();

// Middleware to simulate user authentication
router.use((req, res, next) => {
  // Simulating a user session (Replace with JWT or session management in production)
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.userId = userId;
  next();
});

router.get('/', getTasks);
router.post('/', addTask);

module.exports = router;
