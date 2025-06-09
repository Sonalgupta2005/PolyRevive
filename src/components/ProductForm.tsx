
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Leaf } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface ProductFormProps {
  product?: any;
  onSave: (product: any) => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    image: '/placeholder.svg',
    recyclingRequirements: [],
    inStock: true,
    ecoPoints: '',
    rating: 4.5,
    reviews: 0,
    environmentalImpact: []
  });

  const [newRequirement, setNewRequirement] = useState('');
  const [newImpact, setNewImpact] = useState('');

  const categories = ['Bottles', 'Bags', 'Electronics', 'Office', 'Kitchen', 'Garden'];
  const recyclingTypes = [
    'PET Plastic Bottles',
    'HDPE Containers',
    'Paper Waste',
    'Metal Cans',
    'Glass Bottles',
    'Electronic Waste',
    'Textile Waste',
    'Organic Waste'
  ];

  const environmentalImpactOptions = [
    'Made from 100% recycled materials',
    'Carbon neutral manufacturing process',
    'Biodegradable packaging',
    'Reduces ocean plastic waste',
    'Energy-efficient production',
    'Water-saving manufacturing',
    'Zero waste to landfill',
    'Renewable energy powered',
    'Local sourcing reduces transport emissions',
    'Compostable materials'
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        price: product.price.toString(),
        discountPrice: product.discountPrice.toString(),
        ecoPoints: product.ecoPoints.toString(),
        recyclingRequirements: product.recyclingRequirements || [],
        environmentalImpact: product.environmentalImpact || []
      });
    }
  }, [product]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addRecyclingRequirement = () => {
    if (newRequirement && !formData.recyclingRequirements.includes(newRequirement)) {
      setFormData(prev => ({
        ...prev,
        recyclingRequirements: [...prev.recyclingRequirements, newRequirement]
      }));
      setNewRequirement('');
    }
  };

  const removeRecyclingRequirement = (requirement: string) => {
    setFormData(prev => ({
      ...prev,
      recyclingRequirements: prev.recyclingRequirements.filter(req => req !== requirement)
    }));
  };

  const addEnvironmentalImpact = () => {
    if (newImpact && !formData.environmentalImpact.includes(newImpact)) {
      setFormData(prev => ({
        ...prev,
        environmentalImpact: [...prev.environmentalImpact, newImpact]
      }));
      setNewImpact('');
    }
  };

  const removeEnvironmentalImpact = (impact: string) => {
    setFormData(prev => ({
      ...prev,
      environmentalImpact: prev.environmentalImpact.filter(imp => imp !== impact)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.recyclingRequirements.length === 0) {
      alert('Please add at least one recycling requirement for this product.');
      return;
    }

    if (formData.environmentalImpact.length === 0) {
      alert('Please add at least one environmental impact feature for this product.');
      return;
    }

    const productData = {
      ...formData,
      id: product?.id || Date.now(),
      price: parseInt(formData.price),
      discountPrice: parseInt(formData.discountPrice),
      ecoPoints: parseInt(formData.ecoPoints),
      isEcoFriendly: true
    };

    onSave(productData);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{product ? 'Edit Product' : 'Create New Product'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Product Image</label>
            <ImageUpload
              value={formData.image}
              onChange={(imageUrl) => handleInputChange('image', imageUrl)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Original Price (₹)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Discount Price (₹)</label>
              <Input
                type="number"
                value={formData.discountPrice}
                onChange={(e) => handleInputChange('discountPrice', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Eco Points</label>
              <Input
                type="number"
                value={formData.ecoPoints}
                onChange={(e) => handleInputChange('ecoPoints', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Recycling Requirements</label>
            <div className="flex gap-2 mb-2">
              <Select value={newRequirement} onValueChange={setNewRequirement}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select recycling type" />
                </SelectTrigger>
                <SelectContent>
                  {recyclingTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addRecyclingRequirement} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.recyclingRequirements.map((requirement) => (
                <Badge key={requirement} variant="secondary" className="flex items-center gap-1">
                  {requirement}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeRecyclingRequirement(requirement)}
                  />
                </Badge>
              ))}
            </div>
            {formData.recyclingRequirements.length === 0 && (
              <p className="text-sm text-red-500 mt-1">At least one recycling requirement is needed</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-600" />
              Environmental Impact Features
            </label>
            <div className="flex gap-2 mb-2">
              <Select value={newImpact} onValueChange={setNewImpact}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select environmental impact" />
                </SelectTrigger>
                <SelectContent>
                  {environmentalImpactOptions.map(impact => (
                    <SelectItem key={impact} value={impact}>{impact}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addEnvironmentalImpact} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.environmentalImpact.map((impact) => (
                <Badge key={impact} variant="outline" className="flex items-center gap-1 border-green-200 text-green-700">
                  {impact}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeEnvironmentalImpact(impact)}
                  />
                </Badge>
              ))}
            </div>
            {formData.environmentalImpact.length === 0 && (
              <p className="text-sm text-red-500 mt-1">At least one environmental impact feature is required</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="inStock"
              checked={formData.inStock}
              onChange={(e) => handleInputChange('inStock', e.target.checked)}
            />
            <label htmlFor="inStock" className="text-sm font-medium">In Stock</label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              {product ? 'Update Product' : 'Create Product'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
