import React, { useState } from 'react';
import { Calculator, ShoppingBag, ArrowRightLeft, DollarSign, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';

export const ArbitrageLens: React.FC = () => {
  const [buyPrice, setBuyPrice] = useState<string>("");
  const [sellPrice, setSellPrice] = useState<string>("");
  const [fees, setFees] = useState<string>("10"); // %
  const [shipping, setShipping] = useState<string>("0");

  const b = parseFloat(buyPrice) || 0;
  const s = parseFloat(sellPrice) || 0;
  const f = parseFloat(fees) || 0;
  const ship = parseFloat(shipping) || 0;

  const totalFees = s * (f / 100);
  const profit = s - b - totalFees - ship;
  const roi = b > 0 ? (profit / b) * 100 : 0;

  return (
    <section className="space-y-8" id="arbitrage">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center">
          <Calculator className="text-paper w-5 h-5" />
        </div>
        <div>
          <h2 className="text-3xl font-serif">Arbitrage Lens</h2>
          <p className="text-sm text-ink/60">Calculate the pulse of the market. Know your profit before you move.</p>
        </div>
      </div>

      <div className="glass-card p-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="space-y-8">
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Acquisition Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
                    <input
                      type="number"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-transparent border-b border-ink/10 focus:border-gold py-2 pl-6 outline-none text-xl font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Projected Exit</label>
                  <div className="relative">
                    <DollarSign className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
                    <input
                      type="number"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-transparent border-b border-ink/10 focus:border-gold py-2 pl-6 outline-none text-xl font-mono text-gold"
                    />
                  </div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Platform Fees (%)</label>
                  <input
                    type="number"
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    className="w-full bg-transparent border-b border-ink/10 focus:border-gold py-2 outline-none font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Shipping/Logistics</label>
                  <input
                    type="number"
                    value={shipping}
                    onChange={(e) => setShipping(e.target.value)}
                    className="w-full bg-transparent border-b border-ink/10 focus:border-gold py-2 outline-none font-mono"
                  />
                </div>
             </div>
          </div>

          {/* Results */}
          <div className="bg-ink rounded-2xl p-8 text-paper flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ArrowRightLeft className="w-24 h-24" />
            </div>

            <div className="space-y-1 z-10">
              <p className="text-[10px] uppercase tracking-widest opacity-40">Net Strategic Profit</p>
              <h4 className={cn(
                "text-5xl font-serif",
                profit > 0 ? "text-gold" : profit < 0 ? "text-red-400" : "text-paper"
              )}>
                ${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12 z-10">
              <div className="space-y-1">
                <p className="text-[10px] uppercase opacity-40">Margin / ROI</p>
                <p className="text-xl font-mono">{roi.toFixed(1)}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase opacity-40">Loss to Friction (Fees)</p>
                <p className="text-xl font-mono text-red-300">-${totalFees.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-paper/10 z-10">
               <p className="text-[11px] leading-relaxed opacity-60 italic">
                 {roi > 50 ? "High efficiency move detected. Proceed with precision." : 
                  roi > 20 ? "Solid strategic spread. Standard market returns expected." :
                  roi > 0 ? "Marginal opportunity. Consider time-cost relative to gain." :
                  "Negative arbitrage logic. Resource depletion warning."}
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
