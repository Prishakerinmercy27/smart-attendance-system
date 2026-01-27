import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  seat: {
    type: Number,
    default:60,
  },
  location: {
    type: {
      type: String, // The type of the location, which will be 'Point'
      enum: ['Point'], // 'location.type' must be 'Point'
      required: false
    },
    coordinates: {
      type: [Number], // Array of numbers [longitude, latitude]
      required: false
    }
  }
}, { timestamps: true });

// Create a geospatial index on the location field
UserSchema.index({ location: '2dsphere' });

export default mongoose.model("User", UserSchema);
