import mongoose from 'mongoose';
const SchemaTypes = mongoose.Types;

const CustomerSchema = new mongoose.Schema({
  _id: {type: Number},
  name: {type: String, required: true},

}, {timestamps: true});

export default mongoose.model('customer', CustomerSchema);