

export const protect = (req, res, next) => {
  try {
    const { userId } = req.auth(); // ← Call it as a function
    console.log('UserId:', userId);
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};