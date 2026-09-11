import userModel from "../models/user.model.js";
import { verifyAccessToken } from "../utils/auth.js";

const authentication = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized, access token not found",
      errors: [
        {
          path: token,
          message: "Unauthorized, access token not found",
        },
      ],
    });
  }

  try {
    const data = verifyAccessToken(token);

    const user = await userModel.findById(data.id);

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, access token not found",
      errors: [
        {
          path: token,
          message: "Unauthorized, access token not found",
        },
      ],
    });
  }
};

export default authentication;
