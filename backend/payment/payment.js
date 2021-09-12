/*
 * Title: Payment handler
 * Description: Payment handler
 * Author: Nazmul Haque
 * Date: 09/12/2021
 */

// Dependencies
const uuid = require('uuid').v4;
const stripe = require('stripe')(process.env.SECRET_KEY);
// module scaffolding
const handler = {};

// initialization payment handler
handler.payment = (req, res) => {
    const { product, token } = req.body;
    const idempontencyKey = uuid();
    return stripe.customers
        .create({
            email: token.email,
            source: token.id,
        })
        .then((customer) => {
            stripe.charges.create(
                {
                    amount: product.price * 100,
                    currency: 'usd',
                    customer: customer.id,
                    receipt_email: token.email,
                    description: `Purchase of${product.name}`,
                    shipping: {
                        name: token.card.name,
                        address: {
                            country: token.card.address_country,
                        },
                    },
                },
                { idempontencyKey },
            );
        })
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => console.log(err.message));
};
// module exports
module.exports = handler;
