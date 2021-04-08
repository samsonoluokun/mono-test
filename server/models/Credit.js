import mongoose from 'mongoose';
const SchemaTypes = mongoose.Types;

const CreditSchema = new mongoose.Schema({
  from: {type: SchemaTypes.ObjectId, required: true,},
  accountId: {type: SchemaTypes.ObjectId, required: true},
  amount: {type: Number, required: true},
}, {timestamps: true});

export default mongoose.model('credit', CreditSchema);