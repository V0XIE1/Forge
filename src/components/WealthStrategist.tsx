import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Sparkles, Loader2, Send, BrainCircuit, ArrowRight } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Strategy {
  title: string;
  roi: string;
  difficulty: "Low" | "Medium" | "High";
  description: string;
  steps: string[];
}

export const WealthStrategist: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState("");
  const [strategies, setStrategies] = useState<Strategy[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateStrategies = async () => {
    if (!skills.trim()) return;
    setLoading(true);
    setError(null);

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("Missing GEMINI_API_KEY. Please set it in your environment variables.");
      }
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze these skills and interests: "${skills}". 
        Generate 3 distinct, high-potential but realistic "wealth blueprints" (side hustles or business models).
        Return them in a JSON format.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                roi: { type: Type.STRING, description: "Estimated potential monthly earnings" },
                difficulty: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
                description: { type: Type.STRING },
                steps: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["title", "roi", "difficulty", "description", "steps"],
            },
          },
        },
      });

      const data = JSON.parse(response.text || "[]");
      setStrategies(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Strategic analysis failed. Ensure your skill input is descriptive.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8" id="strategist">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center">
          <BrainCircuit className="text-paper w-5 h-5" />
        </div>
        <div>
          <h2 className="text-3xl font-serif">AI Wealth Strategist</h2>
          <p className="text-sm text-ink/60">Upload your expertise. Receive your blueprint.</p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 space-y-6">
        <div className="space-y-4">
          <label className="text-xs uppercase tracking-widest font-semibold opacity-60">Human Expertise Input</label>
          <textarea
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g., Coding, Graphic Design, Photography, Knowledge of Vintage Watches, Marketing expertise..."
            className="w-full h-32 bg-transparent border-b border-ink/10 focus:border-gold transition-colors resize-none py-2 text-lg outline-none placeholder:opacity-30"
          />
          <button
            onClick={generateStrategies}
            disabled={loading || !skills.trim()}
            className="premium-btn premium-btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />}
            Generate Blueprints
          </button>
        </div>

        {error && <p className="text-sm text-red-500 font-mono">{error}</p>}

        <AnimatePresence>
          {strategies && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-3 gap-6 pt-6 border-t border-ink/5"
            >
              {strategies.map((strategy, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-4 p-5 rounded-xl bg-ink/[0.02] border border-ink/[0.03] hover:border-gold/30 transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <span className={cn(
                      "text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full",
                      strategy.difficulty === "Low" ? "bg-green-100 text-green-700" :
                      strategy.difficulty === "Medium" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                    )}>
                      {strategy.difficulty} Effort
                    </span>
                    <span className="font-mono text-xs opacity-50">Blueprint 0{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-serif group-hover:text-gold transition-colors">{strategy.title}</h3>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-tighter opacity-40">Monthly Potential</p>
                    <p className="font-mono text-lg text-ink/80">{strategy.roi}</p>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed">{strategy.description}</p>
                  <ul className="space-y-2 pt-2">
                    {strategy.steps.map((step, sIdx) => (
                      <li key={sIdx} className="text-xs flex gap-2 text-ink/60">
                        <ArrowRight className="w-3 h-3 flex-shrink-0 mt-0.5 text-gold" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
