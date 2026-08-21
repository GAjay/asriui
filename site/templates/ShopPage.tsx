import { Link } from "react-router-dom";
import { Badge, Button, Icon, PageLayout, Typography, toast } from "asriui";
import { TemplateDemoShell } from "./TemplateDemoShell";
import styles from "./templates.module.css";

const CATEGORIES = ["All", "Apparel", "Accessories", "Home"] as const;

const PRODUCTS = [
  {
    id: "p1",
    name: "AsriUI Soft Tee",
    price: "$32",
    category: "Apparel",
    badge: "Best seller",
    tone: "rose",
    description: "Midweight cotton with a clean boxy cut.",
  },
  {
    id: "p2",
    name: "Mono Cap",
    price: "$24",
    category: "Accessories",
    badge: "New",
    tone: "cyan",
    description: "Structured six-panel with tonal embroidery.",
  },
  {
    id: "p3",
    name: "Studio Tote",
    price: "$58",
    category: "Accessories",
    badge: null,
    tone: "emerald",
    description: "Heavy canvas, interior pocket, matte hardware.",
  },
  {
    id: "p4",
    name: "Desk Mat",
    price: "$42",
    category: "Home",
    badge: "Limited",
    tone: "amber",
    description: "Natural rubber base with stitched edge.",
  },
  {
    id: "p5",
    name: "Work Shirt",
    price: "$68",
    category: "Apparel",
    badge: null,
    tone: "violet",
    description: "Relaxed oxford with mother-of-pearl buttons.",
  },
  {
    id: "p6",
    name: "Ceramic Mug",
    price: "$18",
    category: "Home",
    badge: "Restocked",
    tone: "slate",
    description: "12oz stoneware, dishwasher safe.",
  },
] as const;

export function ShopPage() {
  return (
    <PageLayout variant="centered" contentMaxWidth="64rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <TemplateDemoShell title="Shop page">
            <header className={styles.shopHeader}>
              <div>
                <Badge variant="secondary">Ecommerce</Badge>
                <h1 className={styles.heroTitle}>AsriUI Store</h1>
                <p className={styles.heroLead}>
                  Product grid built with Card patterns, Badge, Button, and Typography — wire add-to-cart to your
                  cart state.
                </p>
              </div>
              <Link to="/templates/cart">
                <Button variant="outline">
                  <Icon name="package" size="sm" />
                  View cart (3)
                </Button>
              </Link>
            </header>

            <div className={styles.filterRow} role="toolbar" aria-label="Product categories">
              {CATEGORIES.map((category, index) => (
                <Button key={category} size="sm" variant={index === 0 ? "primary" : "outline"}>
                  {category}
                </Button>
              ))}
            </div>

            <section className={styles.productGrid} aria-label="Products">
              {PRODUCTS.map((product) => (
                <article key={product.id} className={styles.productCard}>
                  <div className={styles.productMedia} data-tone={product.tone} aria-hidden="true">
                    <Icon name="image" size="lg" />
                  </div>
                  <div className={styles.productBody}>
                    <div className={styles.productMeta}>
                      <Typography variant="muted">{product.category}</Typography>
                      {product.badge ? <Badge variant="outline">{product.badge}</Badge> : null}
                    </div>
                    <h2 className={styles.productName}>{product.name}</h2>
                    <p className={styles.productDesc}>{product.description}</p>
                    <div className={styles.productFooter}>
                      <span className={styles.productPrice}>{product.price}</span>
                      <Button
                        size="sm"
                        onClick={() =>
                          toast.success("Added to cart", { description: product.name })
                        }
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </TemplateDemoShell>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}
