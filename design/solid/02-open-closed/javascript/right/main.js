// Open/closed principle: the RIGHT way.
// PaymentProcessor is closed for modification; new payment methods extend the system as new classes.
// JavaScript has no "interface" keyword: any object with a pay(pence) method will do.

// 1. One class per payment method, each with pay(pence)
class CardPayment {
  pay(pence) {
    console.log(`Card payment: ${pence}p`);
  }
}

class PayPalPayment {
  pay(pence) {
    console.log(`PayPal payment: ${pence}p`);
  }
}

// 2. The processor: we never need to edit this again
class PaymentProcessor {
  process(method, pence) {
    if (pence <= 0) {
      throw new Error("Amount must be above zero");
    }
    method.pay(pence);
  }
}

// Later: Apple Pay arrives. It's a new class; nothing above changes.
class ApplePayPayment {
  pay(pence) {
    console.log(`Apple Pay payment: ${pence}p`);
  }
}

const processor = new PaymentProcessor();
processor.process(new CardPayment(), 2500);
processor.process(new PayPalPayment(), 1050);
processor.process(new ApplePayPayment(), 500);

// No safety net until the call: an object without pay() fails only when it's used.
try {
  processor.process({}, 100);
} catch (e) {
  console.log(`${e.name}: ${e.message}`);
}
