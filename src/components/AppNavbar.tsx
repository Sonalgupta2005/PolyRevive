
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Recycle, Plus, Zap, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AppNavbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/ai-sorting', label: 'AI Sorting', highlighted: true },
    { href: '/support', label: 'Support' },
  ];

  // Check if user is logged in (you can replace this with actual auth logic)
  const isLoggedIn = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-4 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <Recycle className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              PolyRevive
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Navigation Items */}
            <div className="flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.href} to={item.href}>
                    <span className={`font-medium text-lg transition-colors flex items-center gap-2 ${
                      isActive 
                        ? 'text-green-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    } ${item.highlighted ? 'bg-green-100 px-3 py-1 rounded-lg' : ''}`}>
                      {item.highlighted && <Zap className="h-4 w-4 text-green-600" />}
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center gap-4">
              <Link to="/map">
              <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2 px-6 py-3 text-lg">
                <Plus className="h-5 w-5" />
                Book Pickup
              </Button></Link>

              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="https://tse3.mm.bing.net/th?id=OIP.G0-rgY-iYnZgqF_DiS-_oQHaHa&pid=Api&P=0&h=180" alt="User" />
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white text-lg">
                          AK
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Akshit Saxena</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          akshit@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/dashboard" className="w-full">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/community" className="w-full">Community</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Link to="/" className="w-full">Sign Out</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" className="font-medium text-lg">Sign In</Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white text-sm">
                        AK
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Alex Kumar</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        alex@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/dashboard" className="w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/community" className="w-full">Community</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Link to="/" className="w-full">Sign Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="font-medium">Sign In</Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-6">
                  {/* Navigation Items */}
                  <div className="flex flex-col gap-4">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <Link 
                          key={item.href} 
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className={`font-medium text-lg transition-colors flex items-center gap-2 p-2 rounded-lg ${
                            isActive 
                              ? 'text-green-600 bg-green-50' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          } ${item.highlighted ? 'bg-green-100' : ''}`}>
                            {item.highlighted && <Zap className="h-4 w-4 text-green-600" />}
                            {item.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mobile Book Pickup Button */}
                  <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2 py-3">
                    <Plus className="h-5 w-5" />
                    Book Pickup
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
