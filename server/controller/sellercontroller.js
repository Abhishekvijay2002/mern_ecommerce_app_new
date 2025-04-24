const User = require('../models/userModel');

const requestSeller = async (req, res) => {
  try {
    const userId = req.userId.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "seller") {
      return res.status(400).json({ message: "You are already a seller" });
    }
    if (user.sellerApprovalStatus === "pending") {
      return res.status(400).json({ message: "Seller request already pending" });
    }
    user.sellerApprovalStatus = "pending";
    await user.save();

    return res.status(200).json({
      message: "Seller request submitted successfully",
      sellerApprovalStatus: user.sellerApprovalStatus,
    });
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({error :error.message || "Intenal Server Error"})
  }
};


const getSellerStatus = async (req, res) => {
  try {
    const userId = req.userId.id; 
    const user = await User.findById(userId).select("sellerApprovalStatus role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Seller request status retrieved successfully",
      sellerApprovalStatus: user.sellerApprovalStatus,
      role: user.role,
    });
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({error :error.message || "Intenal Server Error"})
  }
};


const cancelSellerRequest = async (req, res) => {
  try {
    // Extract the correct user ID
    const userId = req.userId.id; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.sellerApprovalStatus !== "pending") {
      return res.status(400).json({ message: "No pending seller request to cancel" });
    }

    user.sellerApprovalStatus = null;
    await user.save();

    return res.status(200).json({ message: "Seller request cancelled successfully" });
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({error :error.message || "Intenal Server Error"})
  }
};


const getAllSellerRequests = async (req, res) => {
  try {

    const requests = await User.find({ sellerApprovalStatus: "pending" }).select("name email sellerApprovalStatus");
    return res.status(200).json({
      message: "Seller requests retrieved successfully",
      requests,
    });
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({error :error.message || "Intenal Server Error"})
  }
};
const getSellerRequest = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("name email sellerApprovalStatus role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Seller request details retrieved successfully",
      user,
    });
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({error :error.message || "Intenal Server Error"})
  }
};

const approveSellerRequest = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.sellerApprovalStatus !== "pending") {
      return res.status(400).json({ message: "Seller request is not pending" });
    }
    user.sellerApprovalStatus = "approved";
    user.role = "seller"; // Change role to seller
    await user.save();
    return res.status(200).json({
      message: "Seller request approved successfully",
      user,
    });
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({error :error.message || "Intenal Server Error"})
  }
};
const rejectSellerRequest = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.sellerApprovalStatus !== "pending") {
      return res.status(400).json({ message: "Seller request is not pending" });
    }
    user.sellerApprovalStatus = "rejected";
    await user.save();
    return res.status(200).json({
      message: "Seller request rejected successfully",
      user,
    });
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({error :error.message || "Intenal Server Error"})
  }
};
const removeSeller = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "seller") {
      return res.status(400).json({ message: "User is not a seller" });
    }
    user.role = "user"; // Change role back to user
    user.sellerApprovalStatus = null; 
    await user.save();
    return res.status(200).json({
      message: "Seller removed successfully",
      user,
    });

  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({error :error.message || "Intenal Server Error"})
  }
};

const getAllSeller = async (req, res) => {
try {
  const users = await User.find({role : "seller"});
  return res.status(200).json(users);
}
catch (error) {
  console.log(error)
  res.status(error.status || 500).json({error :error.message || "Intenal Server Error"})
}
};

module.exports = {
  requestSeller,
  getSellerStatus,
  cancelSellerRequest,
  getAllSellerRequests,
  getSellerRequest,
  approveSellerRequest,
  rejectSellerRequest,
  removeSeller,
  getAllSeller
};
