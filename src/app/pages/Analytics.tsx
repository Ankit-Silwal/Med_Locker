import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Download, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { apiGet } from '../utils/api';

interface AnalyticsData {
  weightData: Array<{ month: string; weight: number; target: number }>;
  bloodPressureData: Array<{ date: string; systolic: number; diastolic: number }>;
  bloodSugarData: Array<{ time: string; level: number }>;
  heartRateData: Array<{ day: string; rate: number }>;
  activityData: Array<{ name: string; value: number; color: string }>;
  stats: Array<{ title: string; value: string; change: string; trend: string; color: string }>;
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData>({
    weightData: [],
    bloodPressureData: [],
    bloodSugarData: [],
    heartRateData: [],
    activityData: [],
    stats: [],
  });

  useEffect(() => {
    apiGet<AnalyticsData>('/analytics')
      .then(setData)
      .catch(() => setData({ weightData: [], bloodPressureData: [], bloodSugarData: [], heartRateData: [], activityData: [], stats: [] }));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Analytics</h1>
          <p className="text-gray-600">Visualize your health trends and progress</p>
        </div>
        <Button variant="outline" className="border-[#1E90FF] text-[#1E90FF]">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-[#00C851]" />}
                  {stat.trend === 'down' && <TrendingDown className="w-4 h-4 text-[#FF6B6B]" />}
                  {stat.trend === 'stable' && <Activity className="w-4 h-4 text-[#1E90FF]" />}
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="weight" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="bp">Blood Pressure</TabsTrigger>
          <TabsTrigger value="sugar">Blood Sugar</TabsTrigger>
          <TabsTrigger value="heart">Heart Rate</TabsTrigger>
        </TabsList>

        <TabsContent value="weight">
          <Card>
            <CardHeader>
              <CardTitle>Weight Tracking</CardTitle>
              <CardDescription>Monitor your weight progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.weightData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#1E90FF" 
                    strokeWidth={3}
                    dot={{ fill: '#1E90FF', r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#00C851" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#00C851', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bp">
          <Card>
            <CardHeader>
              <CardTitle>Blood Pressure Trends</CardTitle>
              <CardDescription>Track systolic and diastolic readings</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data.bloodPressureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="systolic" fill="#1E90FF" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="diastolic" fill="#00C851" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sugar">
          <Card>
            <CardHeader>
              <CardTitle>Blood Sugar Levels</CardTitle>
              <CardDescription>Daily glucose monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data.bloodSugarData}>
                  <defs>
                    <linearGradient id="colorSugar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="level" 
                    stroke="#FF6B6B" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorSugar)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heart">
          <Card>
            <CardHeader>
              <CardTitle>Heart Rate Monitor</CardTitle>
              <CardDescription>Weekly heart rate overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.heartRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#FF6B6B" 
                    strokeWidth={3}
                    dot={{ fill: '#FF6B6B', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Activity Summary */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activity Distribution</CardTitle>
            <CardDescription>Daily health activities overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.activityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Insights</CardTitle>
            <CardDescription>Key observations from your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-[#00C851]/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-[#00C851] mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Great Progress!</h4>
                <p className="text-sm text-gray-600">You've reached your target weight goal. Keep maintaining this healthy lifestyle.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-[#1E90FF]/10 rounded-lg">
              <Activity className="w-5 h-5 text-[#1E90FF] mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Stable Vitals</h4>
                <p className="text-sm text-gray-600">Your blood pressure and heart rate are consistently within normal ranges.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-[#FF6B6B]/10 rounded-lg">
              <Calendar className="w-5 h-5 text-[#FF6B6B] mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">Checkup Reminder</h4>
                <p className="text-sm text-gray-600">Schedule your quarterly health checkup with Dr. Ramesh Sharma.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
