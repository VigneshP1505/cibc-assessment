const Transaction = require("../models/transactions-model")

const getTransactions = async (req, res) => {
    const { startDate, endDate,status } = req.query;
    try {
        const projection = {
            id: 1,
            Date: { $dateToString: { format: '%d/%m/%Y', date: '$date' } },
            comments: 1,
            _id: 0
        };

        let query={
            date: { $gte: startDate, $lte: endDate }
        }

        if(status){
            query={...query,status}
        }

        const transactions = await Transaction.find(query, projection);

        res.status(200).send(transactions);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving transactions', error });
    }
}

const getTransactionDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const projection = {
            _id: 0,
            Date: { $dateToString: { format: '%d/%m/%Y', date: '$date' } },
            id: 1,
            sender: 1,
            recipient: 1,
            amount: 1,
            currencyCd: 1,
            comments: 1,
            status: 1
        };

        const transaction = await Transaction.findOne({
            id
        }, projection);
        res.status(200).send(transaction)
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving transaction details', error });
    }
}

const updateComment=async(req,res)=>{
    try{
        const {id,comments}=req.body;

        await Transaction.findOneAndUpdate({
            id
        },{
            comments
        })

        res.status(200).send({message:'Updated comment'})

    }catch(error){
        res.status(500).send({ message: 'Error updating transaction comments!', error });
    }
}

module.exports = { getTransactions, getTransactionDetails,updateComment }