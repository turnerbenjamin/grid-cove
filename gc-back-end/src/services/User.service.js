import User from "../models/User.model.js";

export default class UserService {
  updateById = async (userToUpdateId, updates) => {
    await User.findByIdAndUpdate(userToUpdateId, updates);
  };
}
