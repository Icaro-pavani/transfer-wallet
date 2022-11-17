import { notFoundError } from "../middlewares/handleErrorsMiddleware.js";
import userRepository from "../repositories/userRepository.js";

export default async function checkUser(userId: number) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw notFoundError("User not found!");
  }

  return user;
}
