import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import Layout from '@/components/Layout';
import { getProductById, products } from '@/data/products';
import { useCartContext } from '@/context/CartContext';
import { formatUsd } from '@/utils/bitcoin';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  const product = id ? getProductById(id) : undefined;

  // Related products (same category, excluding current)
  const relatedProducts = product
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)
    : [];

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

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
            Back to Products
          </Link>

          {/* Product Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-xl bg-card border border-border">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
                {product.category}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              
              <p className="text-lg text-muted-foreground mb-6">{product.description}</p>
              
              <p className="text-3xl font-bold mb-8">{formatUsd(product.price)}</p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-medium text-muted-foreground">Quantity:</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 gap-2"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>

              {/* Features */}
              <div className="mt-10 pt-8 border-t border-border">
                <h3 className="font-semibold mb-4">Why Buy With Bitcoin?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• No middlemen or payment processors</li>
                  <li>• Complete privacy - no personal data required</li>
                  <li>• Global shipping with no borders</li>
                  <li>• Support the Bitcoin economy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-8">Related Products</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
