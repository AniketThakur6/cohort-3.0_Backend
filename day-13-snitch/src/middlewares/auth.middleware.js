import {verifyAccessToken} from '../utils/auth.utils.js'

export function authenticate(req, res, next) {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }

  try {
    req.user = verifyAccessToken(accessToken);

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized user"
    })
  }
}
