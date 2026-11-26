// Open/closed principle: the WRONG way.
// Every new payment method means editing processPayment, a method that already works.

class PaymentProcessor {
  processPayment(type, pence) {
    if (type === "card") {
      console.log(`Card payment: ${pence}p`);
    } else if (type === "paypal") {
      console.log(`PayPal payment: ${pence}p`);
    } else {
      // To add Apple Pay, we must come back and add another "else if" above.
      throw new Error(`Unknown payment type: ${type}`);
    }
  }
}

const processor = new PaymentProcessor();
processor.processPayment("card", 2500);
processor.processPayment("paypal", 1050);
try {
  processor.processPayment("applepay", 500);
} catch (e) {
  console.log(`Error: ${e.message}`);
}
