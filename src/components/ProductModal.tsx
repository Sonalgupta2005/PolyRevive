
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Recycle, Award, ShoppingCart, Leaf, Building2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  ecoPoints: number;
  isEcoFriendly: boolean;
  inStock: boolean;
  environmentalImpact?: string[];
  companyName?: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  if (!product) return null;

  // Check if user is logged in
  const isLoggedIn = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup';

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-700">{product.name}</DialogTitle>
          {product.companyName && (
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              by {product.companyName}
            </p>
          )}
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg bg-gradient-to-br from-gray-100 to-gray-200"
            />
            {product.isEcoFriendly && (
              <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                <Recycle className="h-3 w-3 mr-1" />
                Eco-Friendly
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <Badge variant="destructive" className="text-lg px-4 py-2">Out of Stock</Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-green-600">
                  ₹{product.discountPrice}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ₹{product.price}
                </span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </Badge>
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                {product.ecoPoints} pts
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
              <Badge variant="outline">{product.category}</Badge>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Environmental Impact */}
            {product.environmentalImpact && product.environmentalImpact.length > 0 ? (
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Environmental Impact
                </h3>
                <ul className="space-y-1 text-green-700">
                  {product.environmentalImpact.map((impact, index) => (
                    <li key={index}>• {impact}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Environmental Impact
                </h3>
                <ul className="space-y-1 text-green-700">
                  <li>• Made from 100% recycled materials</li>
                  <li>• Reduces plastic waste by equivalent of {product.ecoPoints} bottles</li>
                  <li>• Carbon neutral manufacturing process</li>
                  <li>• Biodegradable packaging</li>
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-3"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? (isLoggedIn ? 'Add to Cart' : 'Sign in to Buy') : 'Out of Stock'}
              </Button>
              <Button variant="outline" className="px-6 text-lg py-3">
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
