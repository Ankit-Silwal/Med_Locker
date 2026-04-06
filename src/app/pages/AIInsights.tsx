import { motion } from 'motion/react';
import { Brain, TrendingUp, AlertTriangle, Heart, Activity, Droplets, Scale } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';

export default function AIInsights() {
  const insights = [
    {
      id: 1,
      title: 'Cardiovascular Health',
      score: 85,
      status: 'good',
      icon: Heart,
      color: 'text-[#00C851]',
      bgColor: 'bg-[#00C851]/10',
      description: 'Your heart rate and blood pressure are stable. Continue your current exercise routine.',
      recommendations: [
        'Maintain 30 minutes of cardio exercise daily',
        'Monitor blood pressure weekly',
        'Include omega-3 rich foods in diet'
      ]
    },
    {
      id: 2,
      title: 'Metabolic Health',
      score: 72,
      status: 'attention',
      icon: Activity,
      color: 'text-[#FF6B6B]',
      bgColor: 'bg-[#FF6B6B]/10',
      description: 'Blood sugar levels show minor fluctuations. Consider dietary adjustments.',
      recommendations: [
        'Reduce refined sugar intake',
        'Increase fiber consumption',
        'Schedule diabetes screening test'
      ]
    },
    {
      id: 3,
      title: 'Hydration Level',
      score: 68,
      status: 'attention',
      icon: Droplets,
      color: 'text-[#1E90FF]',
      bgColor: 'bg-[#1E90FF]/10',
      description: 'Your water intake is below recommended levels. Aim for 8 glasses daily.',
      recommendations: [
        'Drink water every 2 hours',
        'Use hydration reminder apps',
        'Include water-rich fruits and vegetables'
      ]
    },
    {
      id: 4,
      title: 'Weight Management',
      score: 92,
      status: 'excellent',
      icon: Scale,
      color: 'text-[#00C851]',
      bgColor: 'bg-[#00C851]/10',
      description: 'Excellent progress! You have reached your target weight goal.',
      recommendations: [
        'Maintain current diet plan',
        'Continue regular exercise',
        'Monitor weight weekly'
      ]
    }
  ];

  const healthAlerts = [
    {
      id: 1,
      priority: 'high',
      title: 'Medication Reminder',
      message: 'You have missed 2 doses of Metformin this week. Please maintain consistency.',
      time: '2 hours ago'
    },
    {
      id: 2,
      priority: 'medium',
      title: 'Lab Test Due',
      message: 'Your quarterly blood work is due in 5 days. Schedule an appointment soon.',
      time: '1 day ago'
    },
    {
      id: 3,
      priority: 'low',
      title: 'Exercise Milestone',
      message: 'Great job! You have completed 20 consecutive days of exercise.',
      time: '3 days ago'
    }
  ];

  const aiPredictions = [
    {
      metric: 'Blood Pressure',
      prediction: 'Stable',
      confidence: 94,
      trend: 'Your BP is likely to remain within normal range for the next 3 months based on current lifestyle.'
    },
    {
      metric: 'Blood Sugar',
      prediction: 'Minor Increase',
      confidence: 78,
      trend: 'You may experience slight increase in fasting glucose. Consider dietary modifications.'
    },
    {
      metric: 'Weight',
      prediction: 'Stable',
      confidence: 91,
      trend: 'Weight is expected to remain stable with current exercise and diet routine.'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#00C851]';
    if (score >= 60) return 'text-[#1E90FF]';
    return 'text-[#FF6B6B]';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return '[&>div]:bg-[#00C851]';
    if (score >= 60) return '[&>div]:bg-[#1E90FF]';
    return '[&>div]:bg-[#FF6B6B]';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-[#FF6B6B] text-white';
      case 'medium':
        return 'bg-[#1E90FF] text-white';
      case 'low':
        return 'bg-[#00C851] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-3 mb-2">
          <Brain className="w-8 h-8 text-[#1E90FF]" />
          <h1 className="text-3xl font-bold text-gray-900">AI Health Insights</h1>
        </div>
        <p className="text-gray-600">Personalized health analysis powered by artificial intelligence</p>
      </motion.div>

      {/* Health Score Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`${insight.bgColor} p-3 rounded-lg`}>
                        <Icon className={`w-6 h-6 ${insight.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <CardDescription className="mt-1">{insight.description}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getScoreColor(insight.score)}`}>
                        {insight.score}
                      </div>
                      <div className="text-xs text-gray-500">Health Score</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Overall Health</span>
                      <span className="font-semibold">{insight.score}%</span>
                    </div>
                    <Progress value={insight.score} className={`h-2 ${getProgressColor(insight.score)}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">AI Recommendations</h4>
                    <ul className="space-y-2">
                      {insight.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <span className="text-[#1E90FF] mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Health Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-[#FF6B6B]" />
              <CardTitle>Health Alerts & Notifications</CardTitle>
            </div>
            <CardDescription>Important updates about your health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {healthAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                whileHover={{ x: 4 }}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Badge className={getPriorityColor(alert.priority)}>
                  {alert.priority}
                </Badge>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{alert.title}</h4>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Predictions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#1E90FF]" />
              <CardTitle>AI Health Predictions</CardTitle>
            </div>
            <CardDescription>Forecasts based on your health data and trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiPredictions.map((prediction, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-[#1E90FF]/5 to-[#00C851]/5 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{prediction.metric}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="border-[#1E90FF] text-[#1E90FF]">
                      {prediction.prediction}
                    </Badge>
                    <span className="text-xs text-gray-500">{prediction.confidence}% confident</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{prediction.trend}</p>
                <div className="mt-3">
                  <Progress value={prediction.confidence} className="h-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Overall Health Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-[#1E90FF] to-[#00C851] text-white">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-white/20 p-4 rounded-full">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Overall Health Status</h3>
                <p className="text-white/90">AI-powered comprehensive analysis</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <p className="text-lg mb-4">
                Based on comprehensive analysis of your health records, vitals, and lifestyle data, your overall health is in <strong>good condition</strong>. Keep maintaining your current healthy habits and follow the AI recommendations for optimal wellness.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold">82%</div>
                  <div className="text-sm text-white/80">Health Score</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">15</div>
                  <div className="text-sm text-white/80">Active Goals</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-sm text-white/80">Compliance Rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
