import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: [true, "Name is required"]
        },
        mobile: {
            type: Number,
            required: [true, "Mobile number is required"],
            unique: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"]
        },
        role: {
            type: String,
            enum: ["admin", "user", "employee"],
            default: "user"
        },
        orders: {
            type: [Number], 
            default: []
        }
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
