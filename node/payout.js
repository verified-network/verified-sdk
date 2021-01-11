// (c) Kallol Borah, 2021
// Handles request to pay out fiat on redemption of Via cash tokens

app.post('/accounts-update', async(req, res) => {

    const data = req.body;
    const account = data.account;

    await stripe.accounts.update(
        '{{'+account+'}}',
        {
        settings: {
            payouts: {
            schedule: {
                interval: 'manual',
            },
            },
        },
        }
    ).then(function(account) {
        try {
        return res.send({
            account_id: account.account_id,
        });
        } catch (err) {
        return res.status(500).send({
            error: err.message
        });
        }
    });

})

app.post('/create-payout', async(req, res) => {

    const data = req.body;
    const account = data.account;
  
    await stripe.payouts.create({
        amount: data.amount,
        currency: data.currency,
      }, {
        stripeAccount: '{{'+account+'}}',
      }).then(function(payout) {
      try {
        return res.send({
          payout_to : payout.account,
        });
      } catch (err) {
        return res.status(500).send({
          error: err.message
        });
      }
    });
  
})
  
