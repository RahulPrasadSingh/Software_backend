const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    service:{
      type:String,
      required:[true, "Service required"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
