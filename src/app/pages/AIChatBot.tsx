import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Paperclip, Bot, User as UserIcon, AlertCircle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function AIChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI Health Assistant. I can help you understand your symptoms and health reports. Please note: This is not medical advice. Always consult your doctor for proper diagnosis and treatment. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    "I have a headache and fever",
    "What does my blood report mean?",
    "I'm feeling dizzy",
    "Chest pain symptoms",
    "High blood pressure concerns",
    "Diabetes management tips"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('headache') || lowerMessage.includes('fever')) {
      return "Based on your symptoms of headache and fever, it could be a common viral infection, flu, or other conditions. You may have:\n\n• Common cold or flu\n• Viral fever\n• Sinus infection\n\n⚠️ Recommendations:\n• Rest and stay hydrated\n• Monitor your temperature\n• Take over-the-counter fever reducers if needed\n\n⚠️ IMPORTANT: If fever persists for more than 3 days, exceeds 103°F, or you experience severe symptoms, please consult Dr. Ramesh Sharma or visit a hospital immediately. This is not a diagnosis - only a doctor can provide accurate medical advice.";
    }
    
    if (lowerMessage.includes('blood report') || lowerMessage.includes('lab results')) {
      return "I'd be happy to help you understand your blood report! Could you please share which specific values or parameters you'd like me to explain?\n\nCommon blood test components include:\n• Complete Blood Count (CBC)\n• Lipid Profile\n• Blood Sugar levels\n• Liver Function tests\n• Kidney Function tests\n\n⚠️ DISCLAIMER: While I can explain what these values mean, only your doctor (like Dr. Priya Gupta or Dr. Ramesh Sharma) can provide proper interpretation in the context of your overall health.";
    }
    
    if (lowerMessage.includes('dizzy') || lowerMessage.includes('dizziness')) {
      return "Dizziness can have various causes. It could be related to:\n\n• Low blood pressure\n• Dehydration\n• Inner ear problems\n• Low blood sugar\n• Medication side effects\n• Anxiety\n\n⚠️ Immediate actions:\n• Sit or lie down immediately\n• Drink water\n• Avoid sudden movements\n\n⚠️ SEEK IMMEDIATE MEDICAL ATTENTION if you experience:\n• Chest pain\n• Difficulty breathing\n• Severe headache\n• Loss of consciousness\n• Numbness or weakness\n\nThis is not medical advice. Please consult Dr. Ankit Verma or visit your nearest hospital for proper evaluation.";
    }
    
    if (lowerMessage.includes('chest pain')) {
      return "⚠️ IMPORTANT: Chest pain can be serious and requires immediate medical attention!\n\nPossible causes include:\n• Heart-related issues (requires urgent care)\n• Muscle strain\n• Acid reflux\n• Anxiety\n• Respiratory issues\n\n🚨 SEEK EMERGENCY CARE IMMEDIATELY if you have:\n• Severe or crushing chest pain\n• Pain radiating to arm, jaw, or back\n• Shortness of breath\n• Sweating or nausea\n• Dizziness\n\nPlease call emergency services or contact Dr. Ramesh Sharma (Cardiologist) immediately. Do NOT ignore chest pain. This could be a medical emergency!";
    }
    
    if (lowerMessage.includes('blood pressure') || lowerMessage.includes('bp')) {
      return "High blood pressure (hypertension) is a common condition. Based on your health records, here are some insights:\n\n✓ Your recent BP reading: 120/80 (Normal)\n\nManagement tips:\n• Reduce sodium intake\n• Exercise regularly (30 mins daily)\n• Maintain healthy weight\n• Limit alcohol\n• Manage stress\n• Take medications as prescribed\n\n⚠️ Monitor your BP regularly and schedule a checkup with Dr. Kavita Desai if readings consistently exceed 130/80. This information is for educational purposes only - not medical advice.";
    }
    
    if (lowerMessage.includes('diabetes')) {
      return "Based on your health profile, here are some diabetes management tips:\n\n✓ Your recent blood sugar: 95 mg/dL (Normal)\n\nManagement recommendations:\n• Monitor blood sugar regularly\n• Follow prescribed medication schedule\n• Maintain balanced diet (low glycemic foods)\n• Exercise regularly\n• Stay hydrated\n• Get adequate sleep\n\nFoods to include:\n• Whole grains\n• Leafy vegetables\n• Lean proteins\n• Healthy fats (nuts, avocado)\n\n⚠️ Continue your regular consultations with Dr. Priya Gupta and follow her treatment plan. This is general information, not personalized medical advice.";
    }
    
    return "Thank you for your question. To provide you with the most accurate and helpful information, could you please provide more details about your symptoms or concerns?\n\nI can help you with:\n• Understanding symptoms\n• General health information\n• Interpreting lab reports\n• Medication reminders\n• Health tips and recommendations\n\n⚠️ Remember: I'm an AI assistant providing general information. For proper diagnosis and treatment, please consult with your doctor (Dr. Ramesh Sharma, Dr. Priya Gupta, or Dr. Ankit Verma) or visit a healthcare facility.";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-r from-[#1E90FF] to-[#00C851] text-white border-none">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-white/20 p-3 rounded-full"
              >
                <Bot className="w-8 h-8" />
              </motion.div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">AI Health Assistant</h1>
                <p className="text-white/90 text-sm">Get instant health insights and guidance</p>
              </div>
              <Badge className="bg-white/20 text-white border-white/30">Online</Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex-1 grid lg:grid-cols-4 gap-4">
        {/* Chat Area */}
        <Card className="lg:col-span-3 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Chat with AI</CardTitle>
                <CardDescription>Ask about your symptoms and health concerns</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Paperclip className="w-4 h-4 mr-2" />
                Attach Report
              </Button>
            </div>
          </CardHeader>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <Avatar className={`${
                        message.type === 'bot' ? 'bg-gradient-to-br from-[#1E90FF] to-[#00C851]' : 'bg-[#1E90FF]'
                      }`}>
                        <AvatarFallback className="text-white">
                          {message.type === 'bot' ? <Bot className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`rounded-2xl p-4 ${
                        message.type === 'user'
                          ? 'bg-[#1E90FF] text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-2"
                >
                  <Avatar className="bg-gradient-to-br from-[#1E90FF] to-[#00C851]">
                    <AvatarFallback className="text-white">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-2xl p-4">
                    <div className="flex space-x-2">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, delay: 0.4, repeat: Infinity }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Disclaimer */}
          <div className="px-4 py-2 bg-[#FF6B6B]/10 border-t border-[#FF6B6B]/20">
            <div className="flex items-start space-x-2 text-xs text-gray-700">
              <AlertCircle className="w-4 h-4 text-[#FF6B6B] flex-shrink-0 mt-0.5" />
              <p>
                <strong>Medical Disclaimer:</strong> This AI assistant provides general health information only. This is NOT medical advice. Always consult with qualified healthcare professionals (Dr. Ramesh Sharma, Dr. Priya Gupta, or your doctor) for proper diagnosis and treatment.
              </p>
            </div>
          </div>

          {/* Input */}
          <CardContent className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Describe your symptoms or ask a health question..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-[#1E90FF] hover:bg-[#1873CC]"
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Suggestions Sidebar */}
        <Card className="hidden lg:block">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#1E90FF]" />
              <CardTitle className="text-lg">Quick Suggestions</CardTitle>
            </div>
            <CardDescription>Click to ask common questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickSuggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                whileHover={{ x: 4 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
              >
                {suggestion}
              </motion.button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
