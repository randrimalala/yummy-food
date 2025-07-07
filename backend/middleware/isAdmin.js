const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      return next();
    } else {
      return res.status(403).json({ msg: "Accès interdit : admin requis." });
    }
  };
  
  module.exports = isAdmin;
  