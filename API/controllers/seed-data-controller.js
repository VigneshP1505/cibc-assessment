const fs=require("fs")
const Transaction = require("../models/transactions-model")

const insertData = async (_, res) => {
    try {
        const rawData = fs.readFileSync('seed.json');
        const transactions = JSON.parse(rawData);

        await Transaction.insertMany(transactions);

        res.status(201).json({ message: 'Data imported successfully' });
    } catch (error) {
        console.error('Error importing data:', error.message);
        res.status(500).json({ message: 'Failed to import data', error });
    }
}

module.exports={insertData}