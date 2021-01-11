// (c) Kallol Borah, 2021
// Sets up customer and provider accounts

app.post('/issuer-account', async(req, res) => {

    const data = req.body;
    const account = data.account;

    await stripe.customers.create(
        {email: ''+ account.email +''},
        {stripeAccount: '{{'+ account.connected_id +'}}'}
      ).then(function(customer) {
        try {
        return res.send({
            customer : customer.id,
        });
        } catch (err) {
        return res.status(500).send({
            error: err.message
        });
        }
    });

})


app.post('/customer-account', async(req, res) => {

    const data = req.body;
    const account = data.account;

    await stripe.customers.create(
        {name: ''+ account.name +''},
        {email: ''+ account.email +''},
        {metadata: '{'+ account.wallet_address +'}'}
      ).then(function(customer) {
        try {
        return res.send({
            customer : customer.id,
        });
        } catch (err) {
        return res.status(500).send({
            error: err.message
        });
        }
    });

})