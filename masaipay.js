capturePayment: (req, res, next) => {
  instance.payments
    .fetch(req.body.payment_id)
    .then((data) => {
      if (data.status === "captured" && data.captured === true) {
        let payment_id = data.id;
        let userId = req.user._id;
        let amount = data.amount / 100;
        let status = data.status;
        let currency = data.currency;
        let acquirer_data = data.acquirer_data;
        paymentInitiatedData
          .create({ payment_id, amount })
          .then((paymentCapturedData) => {
            res.json({
              status: 200,
              paymentCapturedData,
            });
          })
          .catch((error) => {
            res.json({
              status: 500,
              error,
            });
          });
      } else {
        instance.payments
          .capture(req.body.payment_id, req.body.amount, "INR")
          .then((data) => {
            res.json(data);
          })
          .catch((error) => {
            res.json(error);
          });
      }
    })
    .catch((error) => {
      res.json(error);
    });
};
