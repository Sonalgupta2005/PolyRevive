import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Award, Recycle, Star, ShoppingCart, Building2 } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import ProductModal from '@/components/ProductModal';
import CompanyProductManager from '@/components/CompanyProductManager';
import AddToCartPopup from '@/components/AddToCartPopup';
import { useCompanyAuth } from '@/contexts/CompanyAuthContext';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const [cartProduct, setCartProduct] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isCompany } = useCompanyAuth();
  const { addToCart, getCartCount } = useCart();

  // Check authentication status
  const isLoggedIn = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup';

  // ... keep existing code (products state and other constants)

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Eco-Friendly Water Bottle',
      description: 'Made from 100% recycled plastic bottles. This sustainable water bottle helps reduce plastic waste while keeping your drinks fresh. Features double-wall insulation and leak-proof design.',
      price:659,
      discountPrice: 599,
      image: 'https://media.architecturaldigest.com/photos/5ac525fea4dd1b0e14158278/4:3/w_823,h_617,c_limit/Soma%20and%20Parely%20(Starbucks).png',
      category: 'Bottles',
      rating: 4.8,
      reviews: 156,
      ecoPoints: 50,
      isEcoFriendly: true,
      inStock: true,
      recyclingRequirements: ['PET Plastic Bottles', 'HDPE Containers'],
      environmentalImpact: ['Made from 100% recycled materials', 'Reduces ocean plastic waste', 'Carbon neutral manufacturing process'],
      companyId: 'company1',
      companyName: 'EcoRecycle Solutions'
    },
    {
      id: 2,
      name: 'Recycled Plastic Backpack',
      description: 'Durable backpack made from ocean plastic waste. Spacious design with multiple compartments, perfect for daily use while contributing to ocean cleanup efforts.',
      price: 1999,
      discountPrice: 1599,
      image: 'https://i.pinimg.com/originals/35/7e/13/357e133af99275c6dad4b6ef9ed26721.jpg',
      category: 'Bags',
      rating: 4.9,
      reviews: 203,
      ecoPoints: 150,
      isEcoFriendly: true,
      inStock: true,
      recyclingRequirements: ['PET Plastic Bottles', 'Textile Waste'],
      environmentalImpact: ['Made from ocean plastic waste', 'Water-saving manufacturing', 'Biodegradable packaging'],
      companyName: 'Green Ocean Co'
    },
    {
      id: 3,
      name: 'Sustainable Phone Case',
      description: 'Biodegradable phone case with recycled materials. Provides excellent protection while being environmentally responsible. Compatible with wireless charging.',
      price: 599,
      discountPrice: 399,
      image:'https://9to5mac.com/wp-content/uploads/sites/6/2020/04/lifeproof-wake-recycled-iphone-cases.jpeg?quality=82&strip=all&w=1600',
      category: 'Electronics',
      rating: 4.6,
      reviews: 89,
      ecoPoints: 30,
      isEcoFriendly: true,
      inStock: true,
      recyclingRequirements: ['Electronic Waste', 'PET Plastic Bottles'],
      environmentalImpact: ['Biodegradable materials', 'Compostable packaging'],
      companyName: 'EcoTech Solutions'
    },
    {
      id: 4,
      name: 'Recycled Plastic Desk Organizer',
      description: 'Keep your workspace tidy with recycled materials. Multiple compartments for pens, papers, and office supplies. Sleek design that fits any desk setup.',
      price: 799,
      discountPrice: 699,
      image:  'https://tse1.mm.bing.net/th?id=OIP.HGdP-x2dmY6d6_nWyXh_6AHaEO&pid=Api&P=0&h=180',
      category: 'Office',
      rating: 4.7,
      reviews: 124,
      ecoPoints: 70,
      isEcoFriendly: true,
      inStock: false,
      recyclingRequirements: ['HDPE Containers', 'Paper Waste'],
      environmentalImpact: ['Zero waste to landfill', 'Energy-efficient production'],
      companyName: 'Office Green'
    },
    {
      id: 5,
      name: 'Eco Lunch Box Set',
      description: 'Complete lunch set made from recycled plastics. Includes containers of various sizes, all BPA-free and microwave safe. Perfect for meal prep and reducing single-use packaging.',
      price: 599,
      discountPrice: 549,
      image: 'https://eha.eco/wp-content/uploads/2024/07/53-8.jpg',
      category: 'Kitchen',
      rating: 4.8,
      reviews: 167,
      ecoPoints: 80,
      isEcoFriendly: true,
      inStock: true,
      recyclingRequirements: ['PET Plastic Bottles', 'HDPE Containers'],
      environmentalImpact: ['BPA-free materials', 'Reduces single-use packaging', 'Renewable energy powered'],
      companyName: 'Kitchen Eco'
    },
    {
      id: 6,
      name: 'Recycled Garden Planters',
      description: 'Beautiful planters made from plastic waste. Weather-resistant and durable, perfect for both indoor and outdoor use. Available in multiple sizes and colors.',
      price: 399,
      discountPrice: 349,
      image: 'http://onelittleproject.com/wp-content/uploads/2017/04/diy-water-bottle-craft.jpg',
      category: 'Garden',
      rating: 4.5,
      reviews: 98,
      ecoPoints: 60,
      isEcoFriendly: true,
      inStock: true,
      recyclingRequirements: ['HDPE Containers', 'PET Plastic Bottles'],
      environmentalImpact: ['Local sourcing reduces transport emissions', 'Weather-resistant durability'],
      companyName: 'Garden Plus'
    }
  ]);

  const categories = ['All', 'Bottles', 'Bags', 'Electronics', 'Office', 'Kitchen', 'Garden'];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    addToCart(product);
    setCartProduct(product);
    setIsCartPopupOpen(true);
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleProductUpdate = (updatedProducts: any[]) => {
    setProducts(updatedProducts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Eco Marketplace 🛒</h1>
              <p className="text-lg text-gray-600">Shop sustainable products made from recycled materials</p>
            </div>
            <div className="flex items-center gap-4">
              {!isCompany && getCartCount() > 0 && (
                <Link to="/cart">
                  <Button variant="outline" className="flex items-center gap-2 relative">
                    <ShoppingCart className="h-4 w-4" />
                    Cart
                    <Badge className="absolute -top-2 -right-2 bg-green-500">
                      {getCartCount()}
                    </Badge>
                  </Button>
                </Link>
              )}
              {!isCompany && (
                <Link to="/company-login">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Company Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {isCompany ? (
          <Tabs defaultValue="marketplace" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="manage">Manage Products</TabsTrigger>
            </TabsList>
            
            <TabsContent value="marketplace" className="space-y-8">
              {/* Filter and Search */}
              <div className="mb-8 space-y-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search eco-friendly products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="eco-points">Most Eco Points</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category 
                        ? "bg-gradient-to-r from-green-600 to-green-700 text-white" 
                        : ""
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover bg-gradient-to-br from-gray-100 to-gray-200"
                      />
                      {product.isEcoFriendly && (
                        <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                          <Recycle className="h-3 w-3 mr-1" />
                          Eco-Friendly
                        </Badge>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-green-600">
                            ₹{product.discountPrice}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.price}
                          </span>
                        </div>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          {product.ecoPoints} pts
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-3">
                        {product.reviews} reviews • {product.category}
                        {product.companyName && (
                          <span> • by {product.companyName}</span>
                        )}
                      </div>

                      {product.recyclingRequirements && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Recycling Requirements:</p>
                          <div className="flex flex-wrap gap-1">
                            {product.recyclingRequirements.slice(0, 2).map((req: string) => (
                              <Badge key={req} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <Button 
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                        disabled={!product.inStock}
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? (isLoggedIn ? 'Add to Cart' : 'Sign in to Buy') : 'Out of Stock'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="manage">
              <CompanyProductManager 
                products={products}
                onProductUpdate={handleProductUpdate}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <>
            {/* Filter and Search */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search eco-friendly products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="eco-points">Most Eco Points</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? "bg-gradient-to-r from-green-600 to-green-700 text-white" 
                      : ""
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Discount Banner */}
            <Card className="mb-8 bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Special Eco Discount! 🌱</h3>
                    <p className="text-green-100">Use your recycling rewards for up to 20% off sustainable products</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">20% OFF</div>
                    <div className="text-sm text-green-100">for 50kg+ recyclers</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover bg-gradient-to-br from-gray-100 to-gray-200"
                    />
                    {product.isEcoFriendly && (
                      <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                        <Recycle className="h-3 w-3 mr-1" />
                        Eco-Friendly
                      </Badge>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">
                          ₹{product.discountPrice}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.price}
                        </span>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {product.ecoPoints} pts
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-3">
                      {product.reviews} reviews • {product.category}
                      {product.companyName && (
                        <span> • by {product.companyName}</span>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                      disabled={!product.inStock}
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? (isLoggedIn ? 'Add to Cart' : 'Sign in to Buy') : 'Out of Stock'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}

            {/* Call to Action */}
            <Card className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 border-green-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Want More Eco Products? 🌍
                </h3>
                <p className="text-gray-600 mb-6">
                  The more you recycle, the better discounts you unlock! Start recycling today to access exclusive sustainable products.
                </p>
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  Start Recycling Journey
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        <ProductModal 
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <AddToCartPopup
          isOpen={isCartPopupOpen}
          onClose={() => setIsCartPopupOpen(false)}
          product={cartProduct}
        />
      </div>
    </div>
  );
};

export default Marketplace;
