import { Link } from "react-router-dom";
import { Badge, Button, Form, PageLayout, Typography, toast } from "axiom-ui";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

const CHECKOUT_FORM = {
  submitLabel: "Place order",
  fields: [
    { name: "email", type: "email" as const, label: "Email", required: true },
    { name: "name", type: "text" as const, label: "Full name", required: true },
    { name: "address", type: "text" as const, label: "Street address", required: true },
    { name: "city", type: "text" as const, label: "City", required: true },
    { name: "postal", type: "text" as const, label: "Postal code", required: true },
    {
      name: "shipping",
      type: "select" as const,
      label: "Shipping method",
      required: true,
      options: [
        { label: "Standard (3–5 days) — $8", value: "standard" },
        { label: "Express (1–2 days) — $18", value: "express" },
      ],
    },
    {
      name: "notes",
      type: "textarea" as const,
      label: "Order notes",
      required: false,
      placeholder: "Delivery instructions (optional)",
    },
  ],
};

export function CheckoutPage() {
  return (
    <PageLayout variant="centered" contentMaxWidth="56rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <TemplateDemoShell title="Checkout page">
            <header className={styles.shopHeader}>
              <div>
                <Badge variant="secondary">Ecommerce</Badge>
                <h1 className={styles.heroTitle}>Checkout</h1>
                <p className={styles.heroLead}>
                  Schema-driven Form for shipping details plus a payment summary panel — same Form API as Contact.
                </p>
              </div>
              <Link to="/templates/cart">
                <Button variant="outline">Back to cart</Button>
              </Link>
            </header>

            <div className={styles.checkoutShell}>
              <section className={styles.checkoutForm} aria-label="Shipping details">
                <Typography variant="h3">Shipping</Typography>
                <Form
                  config={CHECKOUT_FORM}
                  onSubmit={async () => {
                    toast.success("Order placed", {
                      description: "Demo only — connect to your payment provider next.",
                    });
                  }}
                />
              </section>

              <aside className={styles.cartSummary} aria-label="Payment summary">
                <Typography variant="h3">Payment</Typography>
                <div className={styles.summaryRow}>
                  <span>Axiom Soft Tee × 1</span>
                  <strong>$32</strong>
                </div>
                <div className={styles.summaryRow}>
                  <span>Mono Cap × 2</span>
                  <strong>$48</strong>
                </div>
                <div className={styles.summaryRow}>
                  <span>Desk Mat × 1</span>
                  <strong>$42</strong>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <strong>$8</strong>
                </div>
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>Due today</span>
                  <strong>$130</strong>
                </div>
                <Typography variant="muted">
                  Card capture is intentionally omitted — drop in Stripe Elements or your PSP inside this panel.
                </Typography>
              </aside>
            </div>
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
