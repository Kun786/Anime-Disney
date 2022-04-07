const stripe = require('stripe')('Your Private Key');

const MakeStripePayment = async(req, res) => {
    stripe.charges.create({
        amount:req.body.Amount,
        currency:'USD',
        description:'Testing Purpose',
        source:req.body.Token
    }, (err, charge) => {
        if(err){res.json({error:err.message})}
        res.json({Message:'Payment Made', Body:charge})
    })
}

module.exports = { MakeStripePayment }