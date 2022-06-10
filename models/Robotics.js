import mongoose from "mongoose";
import geocoder from "../utils/geocoder.js";

const RobotSchema = new mongoose.Schema({
  id: {
   type: Number,
   required: true,
   unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  orientation: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
  }
});

RobotSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    };
  
    // Do not save address
    this.address = undefined;
    next();
  });

export default mongoose.model("Robotic",  RobotSchema)