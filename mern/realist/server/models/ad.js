import { model, Schema, ObjectId } from 'mongoose';

const schema = new Schema(
  {
    photos: [{}],
    price: { type: Number, maxLength: 255 },
    address: { type: String, maxLength: 255, required: true },
    bedrooms: Number,
    bathrooms: Number,
    landsize: Number,
    carpark: Number,
    location: {
      type: {
        type: String,
        enum: ['point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [latitude, longitude]
        default: [37.5326, 127.024612],
      },
    },
    title: {
      type: String,
      maxLength: 255,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    description: {},
    postedBy: { type: ObjectId, ref: 'User' },
    sold: { type: Boolean, default: false },
    googleMap: {},
    type: {
      type: String, //house or land
      default: 'Other',
    },
    action: {
      type: String,
      default: 'Sell',
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default model('Ad', schema);
