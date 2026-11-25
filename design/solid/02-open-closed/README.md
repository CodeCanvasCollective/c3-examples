# Open/closed principle

> "A Module should be open for extension but closed for modification."
> Robert C. Martin, [Solid Relevance](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html) (2020)

The idea comes from Bertrand Meyer's 1988 book *Object-Oriented Software Construction*
([Wikipedia](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)).

**In plain words:** add new behaviour with new code, not by editing code that already works.

## The example: payments

We take card and PayPal payments. Then Apple Pay comes along.

**Wrong way** ([Java](java/wrong/Main.java) · [Python](python/wrong/main.py) · [JavaScript](javascript/wrong/main.js)):
one method checks the payment type with `if / else if`. To add Apple Pay, we have to open that working
method and add another branch. Every new payment method is another edit to the same code, and another
chance to break the ones that already work.

**Right way** ([Java](java/right/Main.java) · [Python](python/right/main.py) · [JavaScript](javascript/right/main.js)):
each payment method is its own class with a `pay(pence)` method. `PaymentProcessor` only knows "something
that can pay". Apple Pay is a new class; `PaymentProcessor` doesn't change.

## Run it

```bash
cd java/right && java Main.java        # Java 11 or later
cd python/right && python main.py      # Python 3
cd javascript/right && node main.js    # Node.js
```

Right way, all three languages:

```
Card payment: 2500p
PayPal payment: 1050p
Apple Pay payment: 500p
```

Each folder's `expected.txt` holds its full output, and CI checks it on every push.

## Same principle, different safety nets

What happens when a payment class forgets its `pay` method?

| Language | The "interface" | When the mistake is caught |
|---|---|---|
| Java | `interface PaymentMethod` | When it compiles |
| Python | `ABC` with `@abstractmethod` | When the object is created: `TypeError: Can't instantiate abstract class BrokenPayment …` |
| JavaScript | None: any object with a `pay()` method works | Only when it's called: `TypeError: method.pay is not a function` |

## Notes

- Amounts are whole pence (`2500` = £25.00). Money in floating point goes wrong: `0.1 + 0.2` is
  `0.30000000000000004`.
- `PaymentProcessor` checks the amount before paying. That shared rule is the code we don't want to touch
  each time a payment method is added.
- Don't build an interface for everything on day one. Reach for this when the same `if / else if`
  keeps growing.

From the [CodeCanvas Collective](https://codecanvascollective.com) post "SOLID in one slide each" (25 November 2026).
