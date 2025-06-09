
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, Recycle, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCompanyAuth } from '@/contexts/CompanyAuthContext';
import AppNavbar from '@/components/AppNavbar';

const CompanyLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    licenseNumber: ''
  });
  const navigate = useNavigate();
  const { loginAsCompany } = useCompanyAuth();

  // Demo companies for testing
  const demoCompanies = [
    {
      id: 'company1',
      name: 'EcoRecycle Solutions',
      email: 'admin@ecorecycle.com',
      password: 'demo123',
      licenseNumber: 'REC-2024-001',
      recyclingCapabilities: ['PET Plastic Bottles', 'HDPE Containers', 'Paper Waste']
    },
    {
      id: 'company2',
      name: 'Green Planet Recycling',
      email: 'contact@greenplanet.com',
      password: 'demo123',
      licenseNumber: 'REC-2024-002',
      recyclingCapabilities: ['Electronic Waste', 'Metal Cans', 'Glass Bottles']
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const company = demoCompanies.find(c => 
      c.email === formData.email && 
      c.password === formData.password &&
      c.licenseNumber === formData.licenseNumber
    );

    if (company) {
      loginAsCompany(company);
      navigate('/marketplace');
    } else {
      alert('Invalid credentials. Please check your email, password, and license number.');
    }
  };

  const handleDemoLogin = (company: any) => {
    loginAsCompany(company);
    navigate('/marketplace');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <AppNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Company Login</CardTitle>
              <p className="text-gray-600">Access your recycling company dashboard</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

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
                  <label className="block text-sm font-medium mb-1">Recycling License Number</label>
                  <Input
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Login as Company
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have a company account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/company-signup')}
                    className="text-green-600 hover:underline"
                  >
                    Register here
                  </button>
                </p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-3">Demo Companies (for testing):</p>
                <div className="space-y-2">
                  {demoCompanies.map((company) => (
                    <Card key={company.id} className="p-3 cursor-pointer hover:bg-gray-50" onClick={() => handleDemoLogin(company)}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{company.name}</p>
                          <p className="text-xs text-gray-500">{company.email}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Shield className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-green-600">{company.licenseNumber}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Login
                        </Button>
                      </div>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {company.recyclingCapabilities.slice(0, 2).map((cap) => (
                            <Badge key={cap} variant="secondary" className="text-xs">
                              {cap}
                            </Badge>
                          ))}
                          {company.recyclingCapabilities.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{company.recyclingCapabilities.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
