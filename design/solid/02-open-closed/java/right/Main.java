// Open/closed principle: the RIGHT way.
// PaymentProcessor is closed for modification; new payment methods extend the system as new classes.

// 1. One shared interface
interface PaymentMethod {
    void pay(long pence);
}

// 2. One class per payment method
class CardPayment implements PaymentMethod {
    public void pay(long pence) {
        System.out.println("Card payment: " + pence + "p");
    }
}

class PayPalPayment implements PaymentMethod {
    public void pay(long pence) {
        System.out.println("PayPal payment: " + pence + "p");
    }
}

// 3. The processor: we never need to edit this again
class PaymentProcessor {
    public void process(PaymentMethod method, long pence) {
        if (pence <= 0) {
            throw new IllegalArgumentException("Amount must be above zero");
        }
        method.pay(pence);
    }
}

// Later: Apple Pay arrives. It's a new class; nothing above changes.
class ApplePayPayment implements PaymentMethod {
    public void pay(long pence) {
        System.out.println("Apple Pay payment: " + pence + "p");
    }
}

public class Main {
    public static void main(String[] args) {
        PaymentProcessor processor = new PaymentProcessor();
        processor.process(new CardPayment(), 2500);
        processor.process(new PayPalPayment(), 1050);
        processor.process(new ApplePayPayment(), 500);
    }
}
