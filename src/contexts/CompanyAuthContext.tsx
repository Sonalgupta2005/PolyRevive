
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CompanyAuthContextType {
  isCompany: boolean;
  companyData: {
    id: string;
    name: string;
    email: string;
    licenseNumber: string;
    recyclingCapabilities: string[];
  } | null;
  loginAsCompany: (data: any) => void;
  logoutCompany: () => void;
}

const CompanyAuthContext = createContext<CompanyAuthContextType>({
  isCompany: false,
  companyData: null,
  loginAsCompany: () => {},
  logoutCompany: () => {},
});

export const useCompanyAuth = () => {
  const context = useContext(CompanyAuthContext);
  if (!context) {
    throw new Error('useCompanyAuth must be used within CompanyAuthProvider');
  }
  return context;
};

export const CompanyAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCompany, setIsCompany] = useState(false);
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    // Check localStorage for company session
    const savedCompanyData = localStorage.getItem('companyAuth');
    if (savedCompanyData) {
      const data = JSON.parse(savedCompanyData);
      setCompanyData(data);
      setIsCompany(true);
    }
  }, []);

  const loginAsCompany = (data: any) => {
    setCompanyData(data);
    setIsCompany(true);
    localStorage.setItem('companyAuth', JSON.stringify(data));
  };

  const logoutCompany = () => {
    setCompanyData(null);
    setIsCompany(false);
    localStorage.removeItem('companyAuth');
  };

  return (
    <CompanyAuthContext.Provider
      value={{
        isCompany,
        companyData,
        loginAsCompany,
        logoutCompany,
      }}
    >
      {children}
    </CompanyAuthContext.Provider>
  );
};
