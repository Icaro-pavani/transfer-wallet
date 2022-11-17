import bcrypt from "bcrypt";
import { conflictError } from "../middlewares/handleErrorsMiddleware.js";
import userRepository from "../repositories/userRepository.js";
import { UserData } from "../schemas/userSchema.js";

async function createUser(userInfo: UserData) {
  const { username, password } = userInfo;
  const SALT = 13;

  const registeredUser = await userRepository.findByUsername(username);
  if (!!registeredUser) {
    throw conflictError("Username already registered!");
  }

  const hashPassword = bcrypt.hashSync(password, SALT);

  const userData = {
    username,
    password: hashPassword,
  };

  await userRepository.create(userData);
}

const userService = { createUser };

export default userService;
