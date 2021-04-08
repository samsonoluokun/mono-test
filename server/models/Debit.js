import mongoose from 'mongoose';
const SchemaTypes = mongoose.Types;

const DebitSchema = new mongoose.Schema({
  to: {type: SchemaTypes.ObjectId, required: true,},
  type: {type: String, default: 'debit'},
  accountId: {type: SchemaTypes.ObjectId, required: true},
  amount: {type: Number, required: true},
}, {timestamps: true});

export default mongoose.model('debit', DebitSchema);