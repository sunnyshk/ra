import { razorpayTestkeyId, razorpayLivekeyId } from "/utils";
import RazorpayCheckout from "react-native-razorpay";

createOrderData = (invoiceNumber) => {
  axios
    .post(`${baseURL}/razorpay/YOUR_API`, {
      invoiceNumber: invoiceNumber,
      token: this.props.token,
    })
    .then((res) => {
      this.setState({
        order_id: res.data.response.id,
        amount: res.data.response.amount,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

callRazorPayFunc = () => {
  var options = {
    description: "Credits toward Your App Name",
    image: "https://demo.png",
    currency: "INR",
    key: `${razorpayLivekeyId}`,
    order_id: this.state.order_id,
    amount: this.state.amount * 100,
    name: "Your App Name",
    theme: { color: "#000000" },
  };
  RazorpayCheckout.open(options)
    .then((data) => {
      // handle success
      axios
        .post(`${baseURL}/razorpay/capturePayment`, {
          order_id: data.razorpay_order_id,
          payment_id: data.razorpay_payment_id,
          signature: data.razorpay_signature,
          token: this.props.token,
        })
        .then((res) => {
          console.log("the response inside", res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
};
