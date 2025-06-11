
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Search, Navigation, Clock, Star, Phone, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { MapContainer, GeoJSON, Marker, Popup, ImageOverlay, useMap, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import L from "leaflet";


const customIcon = new Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


const Map = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [filterType, setFilterType] = useState('all');

  const partners = [
    {
      id: 1,
      name: 'EcoRecycle Center',
      type: 'Collection Center',
      address: 'Janakpuri, New Delhi, Delhi 110058',
      distance: '0.8 km',
      rating: 4.8,
      reviews: 156,
      phone: '+1 (555) 123-4567',
      hours: '9:00 AM - 6:00 PM',
      services: ['Plastic Collection', 'Sorting', 'Pickup Service'],
      lat:28.7041,
      lng:77.1025,
      isOpen: true
    },
    {
      id: 2,
      name: 'GreenWaste Solutions',
      type: 'Pickup Service',
      address: 'Connaught Place, New Delhi',
      distance: '1.2 km',
      rating: 4.9,
      reviews: 203,
      phone: '+1 (555) 987-6543',
      hours: '8:00 AM - 7:00 PM',
      services: ['Home Pickup', 'Bulk Collection', 'Sorting'],
      lat: 28.6139,
      lng: 77.2090,
      isOpen: true
    },
    {
      id: 3,
      name: 'Plastic Renewal Hub',
      type: 'Processing Center',
      address: 'Ghaziabad, Uttar Pradesh 201001',
      distance: '2.1 km',
      rating: 4.6,
      reviews: 89,
      phone: '+1 (555) 456-7890',
      hours: '10:00 AM - 5:00 PM',
      services: ['Advanced Sorting', 'Cleaning', 'Processing'],
      lat:28.6692,
      lng:77.4538,
      isOpen: false
    },
    {
      id: 4,
      name: 'Community Recycle Point',
      type: 'Drop-off Point',
      address: ' Rohini, New Delhi',
      distance: '0.5 km',
      rating: 4.7,
      reviews: 124,
      phone: '+1 (555) 321-0987',
      hours: '24/7 Drop-off Available',
      services: ['Self Drop-off', 'Weight Tracking', 'Point Rewards'],
      lat:28.6921,
      lng: 77.1406,
      isOpen: true
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Partners' },
    { value: 'collection', label: 'Collection Centers' },
    { value: 'pickup', label: 'Pickup Services' },
    { value: 'processing', label: 'Processing Centers' },
    { value: 'dropoff', label: 'Drop-off Points' }
  ];

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
                         partner.address.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesFilter = filterType === 'all' || 
                         partner.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Partner Network 🗺️</h1>
          <p className="text-lg text-gray-600">Find nearby recycling partners and collection points</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by location or partner name..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full lg:w-64">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              Use My Location
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <Card className="lg:sticky lg:top-24 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Interactive Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Map placeholder with markers */}
                 <MapContainer className="absolute"
            //@ts-ignore
              center={[28.6595, 77.3266]}
              zoom={10}
              maxZoom={13}
              minZoom={8}
              style={{
              // height: "100vh",
              height: '100%',
              width: "100%",
              zIndex: 0,
            }}>
            <TileLayer
               url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
               //@ts-ignore
        attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {partners.map(partner => (
      <Marker
        key={partner.id}
        position={[partner.lat, partner.lng]}
        //@ts-ignore
        icon={customIcon}
      >
        <Popup>
          {partner.name} <br />
        </Popup>
      </Marker>
    ))}

            </MapContainer>
                
                
                {/* Simulated map markers */}
                {/* <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  1
                </div>
                <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  2
                </div>
                <div className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  3
                </div>
                <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  4
                </div> */}
                
                <div className="text-center ">
                  <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">Interactive Map Coming Soon</p>
                  <p className="text-sm text-gray-500">Real-time partner locations and tracking</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Click on partner cards to see their location on the map
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Partners List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Nearby Partners ({filteredPartners.length})
              </h2>
              <Button variant="outline" size="sm">
                Sort by Distance
              </Button>
            </div>

            {filteredPartners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{partner.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{partner.type}</Badge>
                        <Badge 
                          variant={partner.isOpen ? "default" : "destructive"}
                          className={partner.isOpen ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          {partner.isOpen ? 'Open' : 'Closed'}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{partner.rating}</span>
                        <span className="text-sm text-gray-500">({partner.reviews})</span>
                      </div>
                      <div className="text-sm font-medium text-green-600">{partner.distance}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-600">{partner.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{partner.hours}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{partner.phone}</span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {partner.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Pickup
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredPartners.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No partners found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Want to Become a Partner? 🤝
            </h3>
            <p className="text-gray-600 mb-6">
              Join our network of recycling partners and help create a more sustainable future together.
            </p>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              Apply to be a Partner
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Map;
