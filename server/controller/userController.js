
const userModel = require("../models/userModel")
const { createToken } = require("../Utilities/generateToken")
const { hashPassword, comparePassword } = require('../Utilities/passwordUtilities')


const register = async (req, res) => {
   try {
      const { name, email, password, confirmpassword } = req.body
      if (!name || !email || !password || !confirmpassword) {
         return res.status(400).json({ error: "all fields are Required" })
      }
      if (password !== confirmpassword) {
         return res.status(400).json({ error: "password and confirm password must be same" })
      }
      const Userexist = await userModel.findOne({ email: email })

      if (Userexist) {
         return res.status(400).json({ error: "User already exist with this email" })
      }
      const hashedPassword = await hashPassword(password)

      const newUser = new userModel({
         name, email, password: hashedPassword
      })
      const saved = await newUser.save()
      return res.status(201).json({ message: "User registered successfully" })
   } catch (error) {
      console.log(error)
      res.status(error.status || 500).json({ error: error.message || "Intenal Server Error" })
   }
}

const login = async (req, res) => {
   try {
      const { email, password } = req.body

      if (!email || !password) {
         return res.status(400).json({ error: "all fields are Required" })
      }
      const userExist = await userModel.findOne({ email })
      if (!userExist) {
         return res.status(400).json({ error: "User not found with this email" })
      }
      const passwordMatch = await comparePassword(password, userExist.password)
      if (!passwordMatch) {
         return res.status(400).json({ error: "Invalid password" })
      }
      const userObject = userExist.toObject()
        delete userObject.password
   const  token = createToken(userExist.id, userExist.role);
      res.status(200).json({ message: "User login successful", user: userObject  , token});
  
  
   } catch (error) {
      console.log(error)
      res.status(error.status || 500).json({ error: error.message || "Intenal Server Error" })
   }

}


const getuser = async (req, res) => {
   try {
      const user = req.userId.id;
      const userExist = await userModel.findById(user).select("-password");

      if (!userExist) {
         return res.status(404).json({ message: "User not found" });
      }

      res.json(userExist);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
   }
};
const updateuser = async (req, res) => {

   try {
      const User = await userModel.findByIdAndUpdate(req.userId.id, req.body, { new: true });
      if (!User) {
         return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User updated successfully", user: User });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });

   }
};


const deleteUser = async (req, res) => {
   try {
      let user = req.userId.id;

      if (req.userId.role === "admin") {
         user = req.params.id;
      }
      console.log(user)

      const Userexist = await userModel.findById(user);
      if (!Userexist) {
         return res.status(404).json({ error: 'User not found' });
      }

      // Delete the user
      await userModel.findByIdAndDelete(user);

      res.status(200).json({ message: 'User deleted successfully' });
   } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
   }
};

const GetallUsers = async (req, res) => {
   try {
      const users = await userModel.find({ role: { $ne: "admin" } }).select("-password");
      if (!users || users.length === 0) {
         return res.status(404).json({ error: "Users not found" });
      }
      res.json(users);
   }
   catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
   }
};






module.exports = {
   register, login, getuser, updateuser, deleteUser, GetallUsers
}