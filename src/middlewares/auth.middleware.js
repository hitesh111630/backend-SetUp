import { User } from "../models/user.model.js"; //import your user model
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookie?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);
    if (!token) {
      throw new ApiError(401, "unAuthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // and also change here
    const user = await User.findById(decodedToken?._id).select(
      "-password -referashToken"
    );

    if (!user) {
      //kuch naya aanevala hai yaha
      throw new ApiError(401, "invalid accessToken");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid ACCESS_TOKEN ");
  }
});
