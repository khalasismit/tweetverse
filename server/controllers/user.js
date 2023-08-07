import User from "../models/User.js";
/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const searchUser = async (req,res)=>{
  try {
    const { firstName } = req.params;
    const user = await User.find({firstName : firstName});
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({error})
  }
}