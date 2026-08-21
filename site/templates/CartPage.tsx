import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Icon, Input, PageLayout, Typography, toast } from "axiom-ui";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

type CartLine = {
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
  tone: string;
};

const INITIAL_CART: CartLine[] = [
  { id: "c1", name: "Axiom Soft Tee", variant: "Black / M", price: 32, qty: 1, tone: "rose" },
  { id: "c2", name: "Mono Cap", variant: "Stone", price: 24, qty: 2, tone: "cyan" },
  { id: "c3", name: "Desk Mat", variant: "Charcoal", price: 42, qty: 1, tone: "amber" },
];

export function CartPage() {
  const [lines, setLines] = useState(INITIAL_CART);
  const [promo, setPromo] = useState("");

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.price * line.qty, 0),
    [lines],
  );
  const shipping = lines.length ? 8 : 0;
  const discount = promo.trim().toUpperCase() === "AXIOM10" ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  const setQty = (id: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((line) => (line.id === id ? { ...line, qty: Math.max(0, qty) } : line))
        .filter((line) => line.qty > 0),
    );
  };

  return (
    <PageLayout variant="centered" contentMaxWidth="60rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <TemplateDemoShell title="Cart page">
            <header className={styles.shopHeader}>
              <div>
                <Badge variant="secondary">Ecommerce</Badge>
                <h1 className={styles.heroTitle}>Your cart</h1>
                <p className={styles.heroLead}>
                  Quantity controls, promo codes, and a sticky-style order summary — built with Input, Button, and
                  Typography.
                </p>
              </div>
              <Link to="/templates/shop">
                <Button variant="outline">Continue shopping</Button>
              </Link>
            </header>

            {lines.length === 0 ? (
              <div className={styles.emptyCart}>
                <Icon name="package" size="lg" />
                <Typography variant="h3">Cart is empty</Typography>
                <Typography variant="muted">Browse the shop and add a few items to try the flow.</Typography>
                <Link to="/templates/shop">
                  <Button>Go to shop</Button>
                </Link>
              </div>
            ) : (
              <div className={styles.cartShell}>
                <section className={styles.cartLines} aria-label="Cart items">
                  {lines.map((line) => (
                    <article key={line.id} className={styles.cartLine}>
                      <div className={styles.cartThumb} data-tone={line.tone} aria-hidden="true">
                        <Icon name="image" size="md" />
                      </div>
                      <div className={styles.cartLineMain}>
                        <div className={styles.cartLineTop}>
                          <div>
                            <h2 className={styles.cartLineName}>{line.name}</h2>
                            <Typography variant="muted">{line.variant}</Typography>
                          </div>
                          <span className={styles.productPrice}>${line.price * line.qty}</span>
                        </div>
                        <div className={styles.cartLineActions}>
                          <div className={styles.qtyControl} aria-label={`Quantity for ${line.name}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              aria-label="Decrease quantity"
                              onClick={() => setQty(line.id, line.qty - 1)}
                            >
                              −
                            </Button>
                            <span className={styles.qtyValue}>{line.qty}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              aria-label="Increase quantity"
                              onClick={() => setQty(line.id, line.qty + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => setQty(line.id, 0)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </section>

                <aside className={styles.cartSummary} aria-label="Order summary">
                  <Typography variant="h3">Order summary</Typography>
                  <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <strong>${subtotal}</strong>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Shipping</span>
                    <strong>${shipping}</strong>
                  </div>
                  {discount > 0 ? (
                    <div className={styles.summaryRow}>
                      <span>Promo (AXIOM10)</span>
                      <strong>−${discount}</strong>
                    </div>
                  ) : null}
                  <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                    <span>Total</span>
                    <strong>${total}</strong>
                  </div>

                  <div className={styles.promoRow}>
                    <Input
                      label="Promo code"
                      placeholder="Try AXIOM10"
                      value={promo}
                      onChange={(event) => setPromo(event.target.value)}
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (promo.trim().toUpperCase() === "AXIOM10") {
                          toast.success("Promo applied", { description: "10% off subtotal." });
                        } else {
                          toast.error("Invalid code", { description: "Use AXIOM10 for this demo." });
                        }
                      }}
                    >
                      Apply
                    </Button>
                  </div>

                  <Link to="/templates/checkout" style={{ display: "block" }}>
                    <Button style={{ width: "100%" }}>Checkout</Button>
                  </Link>
                  <Typography variant="muted">Taxes calculated at checkout in production.</Typography>
                </aside>
              </div>
            )}
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
