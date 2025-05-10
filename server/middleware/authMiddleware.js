exports.verifyFaculty = (req, res, next) => {
    const { role } = req.user; // Assume decoded from JWT
    if (role !== 'faculty') return res.status(403).json({ msg: 'Access Denied' });
    next();
  };
  