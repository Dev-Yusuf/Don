import { Link } from 'react-router-dom';
import { ArrowRight, Bitcoin, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const Index = () => {
  // Featured products (first 12)
  const featuredProducts = products.slice(0, 12);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(330_92%_50%_/_0.15)_0%,_transparent_70%)]" />

        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 mb-8">
              <Bitcoin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">100% Anonymous Payment</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Pleasure, <span className="text-gradient">Private</span> & Secure
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Premium adult toys and intimate essentials. Discreetly paid with Bitcoin.
              No bank statements. No judgment. Just pure satisfaction.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base">
                  Explore Collection
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                  View Latest Arrivals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-y border-border bg-card">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Bitcoin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Completely Anonymous</h3>
              <p className="text-sm text-muted-foreground">
                Pay with Bitcoin. No paper trail on your bank statement. Your secret is safe.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Discreet Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Plain, unmarked packaging. No logos or labels. We value your privacy.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Processing</h3>
              <p className="text-sm text-muted-foreground">
                Orders process immediately upon payment verification. Fast delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Trending Desires</h2>
              <p className="text-muted-foreground">Our most popular intimate items</p>
            </div>
            <Link to="/products" className="hidden sm:block">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <Link to="/products" className="block sm:hidden mt-8">
            <Button variant="outline" className="w-full gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unlock Your <span className="text-gradient">Fantasies</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Discrete, affordable, and high-quality. Experience the freedom of anonymous shopping.
            </p>
            <Link to="/products">
              <Button size="lg" className="gap-2">
                Shop Discreetly Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
