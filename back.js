createOrder: (req, res, next) => {
    Invoice.aggregate([{
        $match: {
            //YOUR CONDITION
        }
    }])
        .then((generatedInvoice) => {
            instance.orders.create({
                amount: generatedInvoice[0].total * 100,
                currency: "INR",
                receipt: generatedInvoice[0].invoiceNumber,
                payment_capture: true
            }, (error, response) => {
                if ((error)) {
                    res.json({
                        error
                    })
                } else {
                    // handle success
                    let orderId = response.id;
                    let amount = response.amount / 100;
                    orderedData.create({ orderId,amount})
                        .then((orderedItem) => {
                            res.json({
                                status: 200,
                                response
                            })
                        })
                        .catch((error) => {
                            res.json({
                                status: 500,
                                error
                            })
                        })
                }
            });
        })
        .catch((error) => {
            res.json({
                status: 500,
                error
            })
        })
}