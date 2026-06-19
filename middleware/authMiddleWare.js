import jwt from "jsonwebtoken";
export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    res.send({
      message: error.message,
      succes: false,
    });
  }
};
