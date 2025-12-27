import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Product } from '@/data/products';
import { useCartContext } from '@/context/CartContext';
import { formatUsd } from '@/utils/bitcoin';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCartContext();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-gold">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              // Fallback for missing images
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </div>

        {/* Quick Add Button */}
        <Button
          size="icon"
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg"
        >
          <Plus className="h-5 w-5" />
        </Button>

        {/* Product Info */}
        <div className="p-4">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="mt-1 font-semibold text-foreground line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <p className="mt-3 text-lg font-bold text-foreground">
            {formatUsd(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
