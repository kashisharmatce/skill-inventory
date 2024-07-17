const mongoose = require("mongoose");

const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow;
};

const usertrackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
      // match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
    },
    USN: {
      type: String,
      required: true,
      unique: true,
    },
    // componentname: {
    //   type: String,
    //   required: true,
    // },
    // quantity: {
    //   type: Number,
    //   required: true,
    //   // min: [1, 'Quantity must be at least 1']
    // },
    // issuedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // returnDate: {
    //   type: Date,
    //   default: getTomorrowDate,
    // },
    components: [
      {
        productName: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        issueAt: {
          type: Date,
          default: Date.now,
        },
        returnDate: {
          type: Date,
          default: getTomorrowDate,
        },
      },
    ],
    status: {
      type: String,
      enum: ["inactive", "active", "pending", "returned"],
      default: "active",
    },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("User", usertrackSchema);
module.exports = user;
