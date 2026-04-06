import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#1E90FF] mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h2>
          <p className="text-gray-600 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button className="bg-[#1E90FF] hover:bg-[#1873CC]">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
