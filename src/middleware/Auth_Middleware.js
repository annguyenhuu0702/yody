const jwt = require("jsonwebtoken");
const getUser = (req, res, next) => {
  try {
    const reqHeader = req.headers["authorization"];
    if (reqHeader) {
      const token = reqHeader.split(" ")[1];
      console.log(token);
      if (token) {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN);
        if (user) {
          req.user = user;
        }
        console.log(user);
      }
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
const verifyToken = (req, res, next) => {
  getUser(req, res, () => {
    if (req.user) {
      next();
    } else {
      return res.status(401).json("Not authorization");
    }
  });
};

const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.params.user_id === req.user.id) {
      next();
    } else {
      return res.status(401).json("Not authorization");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.params.user_id === req.user.id && req.user.is_admin) {
      next();
    } else {
      return res.status(401).json("Not authorization");
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.is_admin) {
      next();
    } else {
      return res.status(401).json("Not authorization");
    }
  });
};
module.exports = {
  getUser,
  verifyToken,
  verifyTokenAndUser,
  verifyTokenAndAdmin,
  verifyAdmin,
};
