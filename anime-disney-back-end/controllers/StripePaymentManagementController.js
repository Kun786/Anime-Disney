const stripe = require('stripe')('sk_test_51KVm3XLK2TVZwhU05chYULk6YOugJWzyEsgsgo0TMfG6MRX6EwJwTvsKNnJJt4Dbwv6zvYamcivIj3Rsn3nDJJZF00YGGkfFrF');

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