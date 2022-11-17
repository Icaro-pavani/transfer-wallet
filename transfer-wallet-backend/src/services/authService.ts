import bcrypt from "bcrypt";
import { unauthorizedError } from "../middlewares/handleErrorsMiddleware.js";
import userRepository from "../repositories/userRepository.js";
import { UserData } from "../schemas/userSchema.js";
import tokenManager from "../utils/tokenManager.js";

async function login(userInfo: UserData) {
  const { username, password } = userInfo;

  const user = await userRepository.findByUsername(username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw unauthorizedError("Invalid username or password!");
  }

  const token = tokenManager.generateToken(user.id);
  return token;
}

const authService = { login };

export default authService;
