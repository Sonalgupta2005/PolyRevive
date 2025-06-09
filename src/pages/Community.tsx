
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Users, Award, TrendingUp, MessageCircle, ThumbsUp, Share2, Trophy, Target } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Community = () => {
  const [selectedTab, setSelectedTab] = useState('leaderboard');

  const leaderboardData = [
    { rank: 1, name: 'Sarah Chen', avatar: '/placeholder.svg', kg: 87.5, points: 1750, change: '+5.2kg' },
    { rank: 2, name: 'Alex Kumar', avatar: '/placeholder.svg', kg: 67.8, points: 1356, change: '+3.1kg' },
    { rank: 3, name: 'Mike Johnson', avatar: '/placeholder.svg', kg: 54.2, points: 1084, change: '+2.8kg' },
    { rank: 4, name: 'Emma Davis', avatar: '/placeholder.svg', kg: 48.9, points: 978, change: '+1.9kg' },
    { rank: 5, name: 'David Lee', avatar: '/placeholder.svg', kg: 42.1, points: 842, change: '+2.3kg' },
    { rank: 6, name: 'Lisa Wang', avatar: '/placeholder.svg', kg: 38.7, points: 774, change: '+1.5kg' },
    { rank: 7, name: 'You', avatar: '/placeholder.svg', kg: 23.5, points: 470, change: '+0.8kg', isCurrentUser: true },
  ];

  const communityPosts = [
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: '/placeholder.svg',
      time: '2 hours ago',
      content: 'Just hit my 100kg milestone! 🎉 Here are my top 3 tips for effective plastic sorting...',
      likes: 24,
      comments: 8,
      shares: 3,
      category: 'Tips & Tricks'
    },
    {
      id: 2,
      author: 'EcoWarrior Mike',
      avatar: '/placeholder.svg',
      time: '4 hours ago',
      content: 'Started a neighborhood cleanup initiative! Already collected 15kg of plastic waste in just one weekend. Who wants to join next Saturday?',
      likes: 18,
      comments: 12,
      shares: 7,
      category: 'Community Action'
    },
    {
      id: 3,
      author: 'Green Emma',
      avatar: '/placeholder.svg',
      time: '1 day ago',
      content: 'Amazing DIY project: turned my recycled plastic bottles into a vertical garden! The plants are thriving 🌱',
      likes: 42,
      comments: 15,
      shares: 12,
      category: 'DIY Projects'
    }
  ];

  const challenges = [
    {
      id: 1,
      title: '50kg Challenge',
      description: 'Recycle 50kg of plastic this month',
      progress: 47,
      target: 50,
      timeLeft: '5 days left',
      reward: '500 bonus points',
      participants: 156,
      difficulty: 'Medium'
    },
    {
      id: 2,
      title: 'Daily Recycler',
      description: 'Recycle plastic every day for a week',
      progress: 5,
      target: 7,
      timeLeft: '2 days left',
      reward: '200 bonus points',
      participants: 89,
      difficulty: 'Easy'
    },
    {
      id: 3,
      title: 'Community Builder',
      description: 'Refer 10 new members this month',
      progress: 3,
      target: 10,
      timeLeft: '12 days left',
      reward: '1000 points + badge',
      participants: 34,
      difficulty: 'Hard'
    }
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Community Hub 👥</h1>
          <p className="text-lg text-gray-600">Connect, compete, and celebrate sustainability together</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">2,847</div>
                  <div className="text-blue-100 text-sm">Active Members</div>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">1,234 kg</div>
                  <div className="text-green-100 text-sm">Community Total</div>
                </div>
                <TrendingUp className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-purple-100 text-sm">Active Challenges</div>
                </div>
                <Target className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">89</div>
                  <div className="text-orange-100 text-sm">Your Rank</div>
                </div>
                <Trophy className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Top 3 Podium */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Top Recyclers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboardData.slice(0, 3).map((user) => (
                      <div key={user.rank} className={`p-4 rounded-lg ${
                        user.rank === 1 ? 'bg-yellow-50 border-2 border-yellow-200' :
                        user.rank === 2 ? 'bg-gray-50 border-2 border-gray-200' :
                        'bg-orange-50 border-2 border-orange-200'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{getRankIcon(user.rank)}</div>
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.kg} kg recycled</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Full Leaderboard */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Global Leaderboard</CardTitle>
                  <CardDescription>This month's recycling champions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboardData.map((user) => (
                      <div key={user.rank} className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                        user.isCurrentUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
                      }`}>
                        <div className="text-lg font-bold text-gray-600 w-8">
                          {user.rank <= 3 ? getRankIcon(user.rank) : `#${user.rank}`}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-600">
                            {user.kg} kg • {user.points} points
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">{user.change}</div>
                          <div className="text-xs text-gray-500">this week</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forum" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Forum Categories */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['Tips & Tricks', 'Community Action', 'DIY Projects', 'Success Stories', 'Questions'].map((category) => (
                      <Button key={category} variant="ghost" className="w-full justify-start">
                        {category}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Forum Posts */}
              <div className="lg:col-span-3 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Recent Posts</h3>
                  <Button className="bg-green-600 hover:bg-green-700">
                    New Post
                  </Button>
                </div>

                {communityPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={post.avatar} />
                          <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{post.author}</div>
                          <div className="text-sm text-gray-500">{post.time}</div>
                        </div>
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      <div className="flex items-center gap-6">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <Share2 className="h-4 w-4" />
                          {post.shares}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Active Challenges</h3>
                {challenges.map((challenge) => (
                  <Card key={challenge.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <Badge className={getDifficultyColor(challenge.difficulty)}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{challenge.progress}/{challenge.target}</span>
                        </div>
                        <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{challenge.timeLeft}</span>
                        <span className="font-medium text-green-600">{challenge.reward}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          {challenge.participants} participants
                        </span>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Join Challenge
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Challenge Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Challenge Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">3</div>
                      <div className="text-sm text-gray-600">In Progress</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Recent Achievements</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
                        <div className="text-lg">🏆</div>
                        <div>
                          <div className="text-sm font-medium">Week Warrior</div>
                          <div className="text-xs text-gray-600">Completed daily recycling</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                        <div className="text-lg">🌟</div>
                        <div>
                          <div className="text-sm font-medium">25kg Milestone</div>
                          <div className="text-xs text-gray-600">Recycled 25kg in a month</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
