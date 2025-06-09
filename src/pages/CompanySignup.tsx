
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building2, Shield, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCompanyAuth } from '@/contexts/CompanyAuthContext';
import AppNavbar from '@/components/AppNavbar';

const CompanySignup = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    description: '',
    recyclingCapabilities: [],
    contactPhone: '',
    address: ''
  });
  const [newCapability, setNewCapability] = useState('');
  const navigate = useNavigate();
  const { loginAsCompany } = useCompanyAuth();

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addRecyclingCapability = () => {
    if (newCapability && !formData.recyclingCapabilities.includes(newCapability)) {
      setFormData(prev => ({
        ...prev,
        recyclingCapabilities: [...prev.recyclingCapabilities, newCapability]
      }));
      setNewCapability('');
    }
  };

  const removeRecyclingCapability = (capability: string) => {
    setFormData(prev => ({
      ...prev,
      recyclingCapabilities: prev.recyclingCapabilities.filter(cap => cap !== capability)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (formData.recyclingCapabilities.length === 0) {
      alert('Please add at least one recycling capability.');
      return;
    }

    // Create new company data
    const companyData = {
      id: `company${Date.now()}`,
      name: formData.companyName,
      email: formData.email,
      licenseNumber: formData.licenseNumber,
      recyclingCapabilities: formData.recyclingCapabilities,
      description: formData.description,
      contactPhone: formData.contactPhone,
      address: formData.address
    };

    // Auto-login the company after signup
    loginAsCompany(companyData);
    navigate('/marketplace');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <AppNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Company Registration</CardTitle>
              <p className="text-gray-600">Join our recycling marketplace as a certified company</p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Company Name</label>
                    <Input
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    Recycling License Number
                  </label>
                  <Input
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    placeholder="REC-YYYY-XXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Company Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of your recycling company..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Phone</label>
                    <Input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <Input
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Recycling Capabilities</label>
                  <div className="flex gap-2 mb-2">
                    <Select value={newCapability} onValueChange={setNewCapability}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select recycling type" />
                      </SelectTrigger>
                      <SelectContent>
                        {recyclingTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" onClick={addRecyclingCapability} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.recyclingCapabilities.map((capability) => (
                      <Badge key={capability} variant="secondary" className="flex items-center gap-1">
                        {capability}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeRecyclingCapability(capability)}
                        />
                      </Badge>
                    ))}
                  </div>
                  {formData.recyclingCapabilities.length === 0 && (
                    <p className="text-sm text-red-500 mt-1">At least one recycling capability is required</p>
                  )}
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Register Company
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/company-login')}
                      className="text-green-600 hover:underline"
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanySignup;
