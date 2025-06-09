
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ShoppingCart, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AddToCartPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

const AddToCartPopup = ({ isOpen, onClose, product }: AddToCartPopupProps) => {
  const navigate = useNavigate();

  if (!product) return null;

  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Added to Cart!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg bg-gray-100"
            />
            <div className="flex-1">
              <h3 className="font-medium text-sm">{product.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold text-green-600">
                  ₹{product.discountPrice}
                </span>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {product.ecoPoints} pts
                </Badge>
              </div>
              {product.companyName && (
                <p className="text-xs text-gray-500 mt-1">by {product.companyName}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              onClick={handleViewCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              View Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartPopup;
