const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (!authHeader) return res.status(401).json({ message: 'Access token missing' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    console.log(decoded)
    req.userId = decoded.user_id; 
        next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
