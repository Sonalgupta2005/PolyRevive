
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Recycle, MapPin, Users, Award, Calendar, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  const [totalPlastic, setTotalPlastic] = useState(23.5);
  const [totalPoints, setTotalPoints] = useState(470);
  const [referrals, setReferrals] = useState(3);

  const getDiscountLevel = (kg: number) => {
    if (kg >= 50) return { discount: 20, level: 'Premium' };
    if (kg >= 20) return { discount: 15, level: 'Gold' };
    if (kg >= 10) return { discount: 10, level: 'Silver' };
    if (kg >= 5) return { discount: 5, level: 'Bronze' };
    return { discount: 0, level: 'Starter' };
  };

  const currentLevel = getDiscountLevel(totalPlastic);
  const nextMilestone = totalPlastic >= 50 ? 50 : totalPlastic >= 20 ? 50 : totalPlastic >= 10 ? 20 : totalPlastic >= 5 ? 10 : 5;
  const progressToNext = Math.min((totalPlastic / nextMilestone) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back, Alex! 🌱</h1>
          <p className="text-lg text-gray-600">Your recycling journey is making a real impact on our planet.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Recycle className="h-5 w-5" />
                Total Recycled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPlastic} kg</div>
              <p className="text-green-100 text-sm">Plastic waste recycled</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5" />
                Reward Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPoints}</div>
              <p className="text-blue-100 text-sm">Available for redemption</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Referrals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{referrals}</div>
              <p className="text-purple-100 text-sm">Friends joined</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Impact Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{currentLevel.level}</div>
              <p className="text-orange-100 text-sm">{currentLevel.discount}% discount active</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress & Rewards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Progress to Next Level
              </CardTitle>
              <CardDescription>
                Keep recycling to unlock better rewards!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Current: {totalPlastic} kg</span>
                  <Badge variant="secondary">{currentLevel.level}</Badge>
                </div>
                <Progress value={progressToNext} className="h-3" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Next milestone: {nextMilestone} kg</span>
                  <span>{Math.max(0, nextMilestone - totalPlastic).toFixed(1)} kg to go</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Available Rewards
              </CardTitle>
              <CardDescription>
                Redeem your points for exclusive benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium">5% Discount</div>
                    <div className="text-sm text-gray-600">100 points</div>
                  </div>
                  <Button size="sm" disabled={totalPoints < 100}>
                    {totalPoints >= 100 ? 'Redeem' : 'Need more'}
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium">10% Discount</div>
                    <div className="text-sm text-gray-600">250 points</div>
                  </div>
                  <Button size="sm" disabled={totalPoints < 250}>
                    {totalPoints >= 250 ? 'Redeem' : 'Need more'}
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <div>
                    <div className="font-medium">15% Discount</div>
                    <div className="text-sm text-gray-600">500 points</div>
                  </div>
                  <Button size="sm" disabled={totalPoints < 500}>
                    {totalPoints >= 500 ? 'Redeem' : 'Need more'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium">Pickup Completed</div>
                        <div className="text-sm text-gray-600">3.5 kg plastic collected</div>
                      </div>
                      <div className="text-sm text-gray-500">2 days ago</div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium">Points Redeemed</div>
                        <div className="text-sm text-gray-600">Used 100 points for 5% discount</div>
                      </div>
                      <div className="text-sm text-gray-500">5 days ago</div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium">Referral Bonus</div>
                        <div className="text-sm text-gray-600">Earned 50 points for new referral</div>
                      </div>
                      <div className="text-sm text-gray-500">1 week ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-20 flex flex-col gap-2 bg-green-600 hover:bg-green-700">
                      <Calendar className="h-6 w-6" />
                      <span>Book Pickup</span>
                    </Button>
                    <Button className="h-20 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700">
                      <MapPin className="h-6 w-6" />
                      <span>Find Partners</span>
                    </Button>
                    <Button className="h-20 flex flex-col gap-2 bg-purple-600 hover:bg-purple-700">
                      <Award className="h-6 w-6" />
                      <span>Marketplace</span>
                    </Button>
                    <Button className="h-20 flex flex-col gap-2 bg-orange-600 hover:bg-orange-700">
                      <Users className="h-6 w-6" />
                      <span>Refer Friend</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Pickups</CardTitle>
                <CardDescription>Manage your scheduled waste collections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No upcoming pickups scheduled</p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Schedule New Pickup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Recycling History</CardTitle>
                <CardDescription>Track your environmental impact over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: '2024-05-20', amount: 3.5, points: 35, status: 'Completed' },
                    { date: '2024-05-15', amount: 7.2, points: 72, status: 'Completed' },
                    { date: '2024-05-10', amount: 2.8, points: 28, status: 'Completed' },
                    { date: '2024-05-05', amount: 4.1, points: 41, status: 'Completed' },
                    { date: '2024-04-28', amount: 5.9, points: 59, status: 'Completed' },
                  ].map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Recycle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">{record.amount} kg plastic</div>
                          <div className="text-sm text-gray-600">{record.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-blue-600">+{record.points} points</div>
                        <Badge variant="secondary" className="text-xs">{record.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals">
            <Card>
              <CardHeader>
                <CardTitle>Referral Program</CardTitle>
                <CardDescription>Invite friends and earn bonus points together</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-800">{referrals}</div>
                      <div className="text-sm text-gray-600">Successful referrals</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-800">{referrals * 50}</div>
                      <div className="text-sm text-gray-600">Points earned from referrals</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Referral Rewards</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">1 Referral</div>
                        <div className="text-sm text-gray-600">50 bonus points</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">5 Referrals</div>
                        <div className="text-sm text-gray-600">250 bonus points</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">10 Referrals</div>
                        <div className="text-sm text-gray-600">500 bonus points</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">20 Referrals</div>
                        <div className="text-sm text-gray-600">1000 points + perks</div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Share Referral Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
