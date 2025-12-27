import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Bitcoin, Copy, Check, ExternalLink, Loader2, MapPin, CreditCard } from 'lucide-react';
import Layout from '@/components/Layout';
import CartItem from '@/components/CartItem';
import { useCartContext } from '@/context/CartContext';
import {
  BTC_ADDRESS,
  fetchBtcPrice,
  usdToBtc,
  formatBtc,
  formatUsd,
  generateOrderId,
  buildWhatsAppMessage,
  getWhatsAppUrl
} from '@/utils/bitcoin';
import { saveOrder } from '@/utils/orders';
import {
  shippingSchema,
  ShippingInfo,
  loadShippingInfo,
  saveShippingInfo,
  formatShippingForMessage
} from '@/utils/shipping';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

type CheckoutStep = 'shipping' | 'payment';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCartContext();
  const navigate = useNavigate();

  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [orderId] = useState(() => generateOrderId());

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<ShippingInfo>({
    resolver: zodResolver(shippingSchema),
    defaultValues: loadShippingInfo(),
  });

  // Fetch BTC price on mount
  useEffect(() => {
    const loadPrice = async () => {
      setIsLoading(true);
      const price = await fetchBtcPrice();
      setBtcPrice(price);
      setIsLoading(false);
    };
    loadPrice();
  }, []);

  // Calculate BTC amount
  const btcAmount = btcPrice ? formatBtc(usdToBtc(cartTotal, btcPrice)) : '0';

  // Copy BTC address to clipboard
  const copyAddress = async () => {
    await navigator.clipboard.writeText(BTC_ADDRESS);
    setCopied(true);
    toast.success('Address copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  // Submit Shipping Form -> Go to Payment
  const onShippingSubmit = (data: ShippingInfo) => {
    saveShippingInfo(data);
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle "I've Paid" action
  const handlePaymentConfirmation = () => {
    const shippingData = getValues();

    // Save order to localStorage
    saveOrder({
      id: orderId,
      items: cart,
      usdTotal: cartTotal,
      btcAmount,
      btcAddress: BTC_ADDRESS,
      btcPrice: btcPrice || 0,
      createdAt: new Date().toISOString(),
      status: 'pending',
      shippingInfo: shippingData
    });

    // Build WhatsApp message with shipping info
    const items = cart.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));
    const shippingFormatted = formatShippingForMessage(shippingData);
    const message = buildWhatsAppMessage(orderId, items, cartTotal, btcAmount, shippingFormatted);
    const whatsappUrl = getWhatsAppUrl(message);

    // Clear cart and redirect to success
    clearCart();

    // Navigate to success page
    navigate(`/success?orderId=${orderId}`);
  };

  // Empty cart state
  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some products to get started.</p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <div className="container">
          {/* Back Link */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">Checkout</h1>

          {/* Step Indicator */}
          <div className="flex items-center gap-4 mb-10">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${step === 'shipping'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground'
              }`}>
              <MapPin className="h-4 w-4" />
              Shipping
            </div>
            <div className="h-px w-8 bg-border" />
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${step === 'payment'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
              }`}>
              <CreditCard className="h-4 w-4" />
              Payment
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Forms */}
            <div>
              {step === 'shipping' ? (
                <>
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Shipping Information
                  </h2>
                  <div className="rounded-xl bg-card border border-border p-6">
                    <form onSubmit={handleSubmit(onShippingSubmit)} className="space-y-4">
                      {/* Full Name */}
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          {...register('fullName')}
                          className={errors.fullName ? 'border-destructive' : ''}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-destructive">{errors.fullName.message}</p>
                        )}
                      </div>

                      {/* Email & Phone */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            {...register('email')}
                            className={errors.email ? 'border-destructive' : ''}
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive">{errors.email.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 234 567 8900"
                            {...register('phone')}
                            className={errors.phone ? 'border-destructive' : ''}
                          />
                          {errors.phone && (
                            <p className="text-xs text-destructive">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          placeholder="123 Main Street, Apt 4B"
                          {...register('address')}
                          className={errors.address ? 'border-destructive' : ''}
                        />
                        {errors.address && (
                          <p className="text-xs text-destructive">{errors.address.message}</p>
                        )}
                      </div>

                      {/* City & State */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            placeholder="New York"
                            {...register('city')}
                            className={errors.city ? 'border-destructive' : ''}
                          />
                          {errors.city && (
                            <p className="text-xs text-destructive">{errors.city.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State / Province</Label>
                          <Input
                            id="state"
                            placeholder="NY"
                            {...register('state')}
                            className={errors.state ? 'border-destructive' : ''}
                          />
                          {errors.state && (
                            <p className="text-xs text-destructive">{errors.state.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Postal Code & Country */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Postal Code *</Label>
                          <Input
                            id="postalCode"
                            placeholder="10001"
                            {...register('postalCode')}
                            className={errors.postalCode ? 'border-destructive' : ''}
                          />
                          {errors.postalCode && (
                            <p className="text-xs text-destructive">{errors.postalCode.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country *</Label>
                          <Input
                            id="country"
                            placeholder="United States"
                            {...register('country')}
                            className={errors.country ? 'border-destructive' : ''}
                          />
                          {errors.country && (
                            <p className="text-xs text-destructive">{errors.country.message}</p>
                          )}
                        </div>
                      </div>

                      <Button type="submit" className="w-full mt-6" size="lg">
                        Continue to Payment
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setStep('shipping')}
                    className="mb-4 text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Edit Shipping Details
                  </button>

                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Bitcoin className="h-5 w-5 text-primary" />
                    Pay with Bitcoin
                  </h2>
                  <div className="rounded-xl bg-card border border-border p-6">
                    {isLoading ? (
                      <div className="flex flex-col items-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground">Loading BTC price...</p>
                      </div>
                    ) : (
                      <>
                        {/* Order ID */}
                        <div className="mb-6 p-4 rounded-lg bg-secondary/50">
                          <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                          <p className="font-mono font-semibold">{orderId}</p>
                        </div>

                        {/* QR Code */}
                        <div className="flex justify-center mb-6">
                          <div className="p-4 bg-foreground rounded-xl">
                            <QRCodeSVG
                              value={`bitcoin:${BTC_ADDRESS}?amount=${btcAmount}`}
                              size={180}
                              level="H"
                              bgColor="hsl(0, 0%, 98%)"
                              fgColor="hsl(0, 0%, 4%)"
                            />
                          </div>
                        </div>

                        {/* BTC Amount */}
                        <div className="text-center mb-6">
                          <p className="text-sm text-muted-foreground mb-2">Send exactly:</p>
                          <div className="flex items-center justify-center gap-2">
                            <Bitcoin className="h-6 w-6 text-primary" />
                            <span className="text-2xl font-bold font-mono">{btcAmount}</span>
                            <span className="text-muted-foreground">BTC</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            ≈ {formatUsd(cartTotal)} at ${btcPrice?.toLocaleString()}/BTC
                          </p>
                        </div>

                        {/* BTC Address */}
                        <div className="mb-6">
                          <p className="text-sm text-muted-foreground mb-2">To this address:</p>
                          <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 font-mono text-sm break-all">
                            <span className="flex-1">{BTC_ADDRESS}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="flex-shrink-0"
                              onClick={copyAddress}
                            >
                              {copied ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Instructions */}
                        <div className="mb-6 p-4 rounded-lg border border-primary/30 bg-primary/5">
                          <p className="text-sm text-foreground">
                            <strong>Important:</strong> Your order will be processed after payment confirmation on the Bitcoin network.
                          </p>
                        </div>

                        {/* Payment Confirmation Button */}
                        <Button
                          className="w-full gap-2"
                          size="lg"
                          onClick={handlePaymentConfirmation}
                        >
                          Verify Payment
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="rounded-xl bg-card border border-border p-6 sticky top-24">
                {/* Cart Items */}
                <div className="mb-6 max-h-[300px] overflow-y-auto">
                  {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                {/* Shipping Summary (Preview) */}
                {step === 'payment' && (
                  <div className="mb-6 p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Shipping to:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getValues().fullName}<br />
                      {getValues().address}<br />
                      {getValues().city}, {getValues().state} {getValues().postalCode}<br />
                      {getValues().country}
                    </p>
                  </div>
                )}

                {/* Totals */}
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatUsd(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span>Total (USD)</span>
                    <span>{formatUsd(cartTotal)}</span>
                  </div>
                  {btcPrice && (
                    <div className="flex justify-between text-lg font-bold text-primary">
                      <span>Total (BTC)</span>
                      <span>₿{btcAmount}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
