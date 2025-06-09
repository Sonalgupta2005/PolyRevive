
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import ProductForm from './ProductForm';
import { useCompanyAuth } from '@/contexts/CompanyAuthContext';

interface CompanyProductManagerProps {
  products: any[];
  onProductUpdate: (products: any[]) => void;
}

const CompanyProductManager = ({ products, onProductUpdate }: CompanyProductManagerProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { companyData } = useCompanyAuth();

  const companyProducts = products.filter(product => 
    product.companyId === companyData?.id
  );

  const handleSaveProduct = (productData: any) => {
    const updatedProduct = {
      ...productData,
      companyId: companyData?.id,
      companyName: companyData?.name
    };

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => 
        p.id === editingProduct.id ? updatedProduct : p
      );
    } else {
      updatedProducts = [...products, updatedProduct];
    }

    onProductUpdate(updatedProducts);
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      onProductUpdate(updatedProducts);
    }
  };

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onSave={handleSaveProduct}
        onCancel={() => {
          setShowForm(false);
          setEditingProduct(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {companyProducts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Products Yet</h3>
            <p className="text-gray-500 mb-4">Start by adding your first recycled product to the marketplace.</p>
            <Button onClick={() => setShowForm(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Product
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {companyProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full lg:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                          {!product.inStock && (
                            <Badge variant="destructive" className="w-fit">Out of Stock</Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3 text-sm sm:text-base">{product.description}</p>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg sm:text-xl font-bold text-green-600">₹{product.discountPrice}</span>
                            <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                          </div>
                          <Badge variant="secondary" className="w-fit">{product.ecoPoints} eco points</Badge>
                          <Badge variant="outline" className="w-fit">{product.category}</Badge>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Recycling Requirements:</p>
                          <div className="flex flex-wrap gap-1">
                            {product.recyclingRequirements?.map((req: string) => (
                              <Badge key={req} variant="secondary" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                          className="w-full sm:w-auto"
                        >
                          <Edit className="h-4 w-4 sm:mr-0 mr-2" />
                          <span className="sm:hidden">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700 w-full sm:w-auto"
                        >
                          <Trash2 className="h-4 w-4 sm:mr-0 mr-2" />
                          <span className="sm:hidden">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyProductManager;
