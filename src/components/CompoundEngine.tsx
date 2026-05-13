import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';
import { motion } from 'framer-motion';

export const CompoundEngine: React.FC = () => {
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);

  const data = useMemo(() => {
    let current = initial;
    const r = rate / 100 / 12;
    const points = [];
    
    for (let i = 0; i <= years * 12; i++) {
      if (i % 12 === 0) {
        points.push({
          year: i / 12,
          total: Math.round(current),
        });
      }
      current = (current + monthly) * (1 + r);
    }
    return points;
  }, [initial, monthly, rate, years]);

  const finalAmount = data[data.length - 1].total;

  return (
    <section className="space-y-8" id="compound">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center">
          <TrendingUp className="text-paper w-5 h-5" />
        </div>
        <div>
          <h2 className="text-3xl font-serif">Compound Growth Engine</h2>
          <p className="text-sm text-ink/60">Visualize the exponential results of consistent high-ROI actions.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="glass-card p-6 space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-widest opacity-40">Growth Parameters</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold opacity-40">
                <span>Initial Capital ($)</span>
                <span>${initial.toLocaleString()}</span>
              </div>
              <input type="range" min="0" max="50000" step="500" value={initial} onChange={(e) => setInitial(parseInt(e.target.value))} className="w-full accent-gold" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold opacity-40">
                <span>Monthly Hustle Deposit ($)</span>
                <span>${monthly.toLocaleString()}</span>
              </div>
              <input type="range" min="0" max="10000" step="100" value={monthly} onChange={(e) => setMonthly(parseInt(e.target.value))} className="w-full accent-gold" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold opacity-40">
                <span>Estimated ROI (%)</span>
                <span>{rate}%</span>
              </div>
              <input type="range" min="1" max="100" step="1" value={rate} onChange={(e) => setRate(parseInt(e.target.value))} className="w-full accent-gold" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold opacity-40">
                <span>Time Horizon (Years)</span>
                <span>{years} Years</span>
              </div>
              <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(parseInt(e.target.value))} className="w-full accent-gold" />
            </div>
          </div>

          <div className="pt-6 border-t border-ink/5 space-y-1">
            <p className="text-[10px] uppercase tracking-tighter opacity-40">Projected Value</p>
            <p className="text-4xl font-serif text-gold">${finalAmount.toLocaleString()}</p>
          </div>
        </div>

        <div className="lg:col-span-2 glass-card p-6 min-h-[400px] flex flex-col">
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c5a059" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#c5a059" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a10" vertical={false} />
              <XAxis 
                dataKey="year" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#1a1a1a60'}}
                label={{ value: 'Years', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#1a1a1a40' }}
              />
              <YAxis 
                hide 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#f5f2ed',
                  fontSize: '12px'
                }}
                itemStyle={{ color: '#c5a059' }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Total Value']}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#c5a059" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorTotal)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </section>
);
};
