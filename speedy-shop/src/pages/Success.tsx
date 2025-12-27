import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Home, Package, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';
import { getOrderById } from '@/utils/orders';
import { formatUsd } from '@/utils/bitcoin';
import { Button } from '@/components/ui/button';

const Success = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const order = orderId ? getOrderById(orderId) : undefined;

  return (
    <Layout>
      <div className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-lg text-center">
            {/* Success Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-gold">
                  <CheckCircle className="h-12 w-12 text-primary" />
                </div>
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Payment Under Verification
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your payment is under verification. Once it's verified, shipping will start immediately.
            </p>

            {/* Order Details */}
            {order && (
              <div className="rounded-xl bg-card border border-border p-6 mb-8 text-left">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Order Details
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order ID</span>
                    <span className="font-mono font-semibold">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items</span>
                    <span>{order.items.length} item(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total (USD)</span>
                    <span className="font-semibold">{formatUsd(order.usdTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total (BTC)</span>
                    <span className="font-semibold text-primary">₿{order.btcAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="inline-flex items-center gap-1 text-yellow-500">
                      <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
                      Under Verification
                    </span>
                  </div>
                </div>

                {/* Shipping Info */}
                {order.shippingInfo && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Shipping to:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.shippingInfo.fullName}<br />
                      {order.shippingInfo.address}<br />
                      {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.postalCode}<br />
                      {order.shippingInfo.country}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Next Steps */}
            <div className="rounded-xl border border-border p-6 mb-8 text-left">
              <h2 className="font-semibold mb-4">What happens next?</h2>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">1</span>
                  <span>We'll verify your Bitcoin payment (1-3 network confirmations)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">2</span>
                  <span>We'll confirm your order via WhatsApp</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">3</span>
                  <span>Your order ships within 1-3 business days</span>
                </li>
              </ol>
            </div>

            {/* Actions */}
            <Link to="/">
              <Button size="lg" className="gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
