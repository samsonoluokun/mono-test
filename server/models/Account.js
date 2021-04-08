import mongoose from 'mongoose';
const SchemaTypes = mongoose.Types;

const AccountSchema = new mongoose.Schema({
  number: {type: String, required: true},
  balance: {type: Number, required: true},
  customerId: {type: Number, required: true, select: false},
}, {timestamps: true});

export default mongoose.model('account', AccountSchema);