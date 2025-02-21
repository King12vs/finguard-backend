import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.user.sub });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, avatar } = req.body;
  const auth0Id = req.user.sub;

  try {
    let user = await User.findOne({ auth0Id });
    if (!user) {
      user = new User({ auth0Id, name, email, avatar });
      await user.save();
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
