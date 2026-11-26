// Open/closed principle: the WRONG way.
// Every new payment method means editing processPayment, a method that already works.

class PaymentProcessor {
    public void processPayment(String type, long pence) {
        if (type.equals("card")) {
            System.out.println("Card payment: " + pence + "p");
        } else if (type.equals("paypal")) {
            System.out.println("PayPal payment: " + pence + "p");
        } else {
            // To add Apple Pay, we must come back and add another "else if" above.
            throw new IllegalArgumentException("Unknown payment type: " + type);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        PaymentProcessor processor = new PaymentProcessor();
        processor.processPayment("card", 2500);
        processor.processPayment("paypal", 1050);
        try {
            processor.processPayment("applepay", 500);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
