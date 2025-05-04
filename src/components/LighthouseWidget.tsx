
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Gauge } from 'lucide-react';

interface PerformanceMetric {
  name: string;
  score: number;
}

const LighthouseWidget = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([
    { name: 'Performance', score: 96 },
    { name: 'Accessibility', score: 98 },
    { name: 'Best Practices', score: 100 },
    { name: 'SEO', score: 100 }
  ]);

  useEffect(() => {
    // This would typically fetch real Lighthouse data from an API
    // For demo purposes, we're using static data
    
    // Example of how you could fetch real data:
    // const fetchLighthouseData = async () => {
    //   try {
    //     const response = await fetch('https://your-lighthouse-api.com/metrics');
    //     const data = await response.json();
    //     setMetrics(data.metrics);
    //   } catch (error) {
    //     console.error('Failed to fetch Lighthouse data:', error);
    //   }
    // };
    // 
    // fetchLighthouseData();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 py-8">
      <Card className="w-full md:w-96 mx-auto bg-[#101630] border border-[#1e293b] shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Gauge className="text-accent" size={18} />
              <h3 className="font-medium text-white text-sm">Lighthouse Metrics</h3>
            </div>
            <TrendingUp className="text-green-400" size={16} />
          </div>
          
          <div className="space-y-3">
            {metrics.map((metric) => (
              <div key={metric.name} className="flex items-center justify-between">
                <span className="text-xs text-gray-300">{metric.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-white">{metric.score}</span>
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: getScoreColor(metric.score) }}></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-[#1e293b] text-center">
            <p className="text-[10px] text-gray-400">Last updated 04 May 2025</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LighthouseWidget;
