function checkRole(...allowedRoles) {
  return (req, res, next) => {
    
    if (req.user.role === "admin") {
      return next();
    }

    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Bạn không có quyền truy cập",
        yourRole: req.user.role,
        allowedRoles
      });
    }

    next();
  };
}

module.exports = checkRole;
