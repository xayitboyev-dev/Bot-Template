const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        firstName: String,
        lastName: String,
        username: String,
        active: {
            type: Boolean,
            default: true
        },
        role: {
            type: String,
            default: 'USER'
        }
    },
    { timestamps: true }
);

// Index to optimize queries
userSchema.index({ active: 1 });
userSchema.index({ id: 1 });

module.exports = mongoose.model("user", userSchema);