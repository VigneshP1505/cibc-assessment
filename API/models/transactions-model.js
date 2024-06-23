const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const senderSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    IDNumber: { type: String, required: true }
});


const recipientSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bank: { type: String, required: true }
});


const transactionSchema = new Schema({
    id: { type: String, required: true },
    date: { type: Date, required: true },
    sender: { type: senderSchema, required: true },
    recipient: { type: recipientSchema, required: true },
    amount: { type: Number, required: true },
    currencyCd: { type: String, required: true },
    comments: { type: String, required: true },
    status: { 
        type: String, 
        required: true,
        enum: ['COMPLETED', 'IN PROGRESS', 'REJECTED','PENDING'],
        uppercase: true
    }
});


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
