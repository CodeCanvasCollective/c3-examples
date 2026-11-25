# Open/closed principle: the WRONG way.
# Every new payment method means editing process_payment, a function that already works.


class PaymentProcessor:
    def process_payment(self, kind: str, pence: int) -> None:
        if kind == "card":
            print(f"Card payment: {pence}p")
        elif kind == "paypal":
            print(f"PayPal payment: {pence}p")
        else:
            # To add Apple Pay, we must come back and add another "elif" above.
            raise ValueError(f"Unknown payment type: {kind}")


processor = PaymentProcessor()
processor.process_payment("card", 2500)
processor.process_payment("paypal", 1050)
try:
    processor.process_payment("applepay", 500)
except ValueError as e:
    print(f"Error: {e}")
