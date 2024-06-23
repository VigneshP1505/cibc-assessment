const { query,param, validationResult } = require('express-validator');

const validateGetTransactions = [
    query('startDate').notEmpty().withMessage('startDate is required').toDate(),
    query('endDate').notEmpty().withMessage('endDate is required').toDate(),
    query('status').optional().custom(value=>{
        if (!["PENDING","COMPLETED","IN PROGRESS","REJECTED"].includes(value)) {
            throw new Error('status must be one of PENDING,COMPLETED,REJECTED,IN PROGRESS');
          }
          return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);

        const queryParams = Object.keys(req.query);
        const allowedParams = ['startDate', 'endDate','status']

        const disallowedFieldErrors = queryParams.filter(param => !allowedParams.includes(param)).map(param => ({
            param,
            msg: `${param} is not allowed`
        }));

        if (disallowedFieldErrors.length > 0) {
            return res.status(400).json({ errors: disallowedFieldErrors });
        }

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateTransactionDetails = [
    param('id').notEmpty().withMessage('id parameter is required'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateGetTransactions,validateTransactionDetails }