# Open/closed principle: the RIGHT way.
# PaymentProcessor is closed for modification; new payment methods extend the system as new classes.

from abc import ABC, abstractmethod


# 1. One shared interface (an abstract base class)
class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, pence: int) -> None: ...


# 2. One class per payment method
class CardPayment(PaymentMethod):
    def pay(self, pence: int) -> None:
        print(f"Card payment: {pence}p")


class PayPalPayment(PaymentMethod):
    def pay(self, pence: int) -> None:
        print(f"PayPal payment: {pence}p")


# 3. The processor: we never need to edit this again
class PaymentProcessor:
    def process(self, method: PaymentMethod, pence: int) -> None:
        if pence <= 0:
            raise ValueError("Amount must be above zero")
        method.pay(pence)


# Later: Apple Pay arrives. It's a new class; nothing above changes.
class ApplePayPayment(PaymentMethod):
    def pay(self, pence: int) -> None:
        print(f"Apple Pay payment: {pence}p")


processor = PaymentProcessor()
processor.process(CardPayment(), 2500)
processor.process(PayPalPayment(), 1050)
processor.process(ApplePayPayment(), 500)


# The safety net: a payment class that forgets pay() can't even be created.
class BrokenPayment(PaymentMethod):
    pass


try:
    BrokenPayment()
except TypeError as e:
    print(f"TypeError: {e}")
