import mongoose from 'mongoose';
const SchemaTypes = mongoose.Types;

const TransactionSchema = new mongoose.Schema({
  to: { type: SchemaTypes.ObjectId },
  from: { type: SchemaTypes.ObjectId },
  type: {type: String, enum: ['credit', 'debit'], required: true},
  accountId: {type: SchemaTypes.ObjectId, required: true},
  amount: {type: Number, required: true},
}, {timestamps: true});

export default mongoose.model('transaction', TransactionSchema);