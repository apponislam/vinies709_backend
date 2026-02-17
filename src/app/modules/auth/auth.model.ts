// import mongoose, { Schema } from "mongoose";

// const UserSchema = new Schema(
//     {
//         firstName: { type: String, required: [true, "First name is required"] },
//         lastName: { type: String, required: [true, "Last name is required"] },
//         email: {
//             type: String,
//             required: [true, "Email is required"],
//             unique: true,
//             index: true,
//             match: [/.+\@.+\..+/, "Please enter a valid email address"],
//         },
//         password: { type: String, required: [true, "Password is required"] },
//         role: {
//             type: String,
//             enum: ["VENDOR", "BUYER", "DRIVER", "INVENTORY_MANAGER", "PRICER", "TREASURER", "MANAGER", "CLIENT", "SALES_AGENT"],
//             required: [true, "Role is required"],
//         },
//         phone: String,
//         location: String,
//         isActive: { type: Boolean, default: true },
//         lastLogin: Date,
//     },
//     {
//         timestamps: true,
//         versionKey: false,
//         toJSON: {
//             transform(doc, ret) {
//                 const retObj = ret as any;
//                 delete retObj.password;
//                 return retObj;
//             },
//         },
//     },
// );

// // Single-field indexes
// UserSchema.index({ email: 1 }, { unique: true });
// UserSchema.index({ role: 1 });
// UserSchema.index({ isActive: 1 });
// UserSchema.index({ location: 1 });
// UserSchema.index({ lastLogin: -1 });

// // Compound indexes for common queries
// UserSchema.index({ role: 1, isActive: 1 });
// UserSchema.index({ location: 1, role: 1 });
// UserSchema.index({ createdAt: -1 });

// export const UserModel = mongoose.model("User", UserSchema);

import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        firstName: { type: String, required: [true, "First name is required"] },
        lastName: { type: String, required: [true, "Last name is required"] },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            index: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"],
        },
        password: { type: String, required: [true, "Password is required"] },
        role: {
            type: String,
            enum: ["VENDOR", "BUYER", "DRIVER", "INVENTORY_MANAGER", "PRICER", "TREASURER", "MANAGER", "CLIENT", "SALES_AGENT"],
            required: [true, "Role is required"],
        },
        phone: { type: String },
        location: { type: String },
        isActive: { type: Boolean, default: true },
        lastLogin: { type: Date },

        // Password reset fields
        resetPasswordOtp: { type: String },
        resetPasswordOtpExpiry: { type: Date },
        resetPasswordToken: { type: String },
        resetPasswordTokenExpiry: { type: Date },

        // Email update fields
        pendingEmail: { type: String },
        emailVerificationToken: { type: String },
        emailVerificationExpiry: { type: Date },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(doc, ret) {
                const retObj = ret as any;
                delete retObj.password;
                delete retObj.resetPasswordOtp;
                delete retObj.resetPasswordOtpExpiry;
                delete retObj.resetPasswordToken;
                delete retObj.resetPasswordTokenExpiry;
                delete retObj.emailVerificationToken;
                delete retObj.emailVerificationExpiry;
                return retObj;
            },
        },
    },
);

// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ resetPasswordToken: 1 });
UserSchema.index({ emailVerificationToken: 1 });

export const UserModel = mongoose.model("User", UserSchema);
