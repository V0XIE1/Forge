import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, Plus, X, ListTodo } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Task {
  id: string;
  title: string;
  impact: number; // 0-100
  effort: number; // 0-100
}

export const TheMatrix: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Learn UI Design', impact: 80, effort: 60 },
    { id: '2', title: 'Email Potential Clients', impact: 90, effort: 20 },
    { id: '3', title: 'Setup LinkedIn Profile', impact: 40, effort: 30 },
  ]);
  const [newTask, setNewTask] = useState({ title: '', impact: 50, effort: 50 });

  const addTask = () => {
    if (!newTask.title) return;
    setTasks([...tasks, { ...newTask, id: Date.now().toString() }]);
    setNewTask({ title: '', impact: 50, effort: 50 });
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <section className="space-y-8" id="matrix">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center">
          <Target className="text-paper w-5 h-5" />
        </div>
        <div>
          <h2 className="text-3xl font-serif">Action Priority Matrix</h2>
          <p className="text-sm text-ink/60">Identify High-ROI targets. Eliminate time-wasters.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Matrix Visualization */}
        <div className="glass-card p-8 aspect-square relative overflow-hidden">
          {/* Axis Labels */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest opacity-30">High Impact</div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest opacity-30">Low Impact</div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest opacity-30 [writing-mode:vertical-rl] rotate-180">Low Effort</div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest opacity-30 [writing-mode:vertical-rl]">High Effort</div>

          {/* Grid Lines */}
          <div className="absolute inset-8 border-l border-b border-ink/10" />
          <div className="absolute inset-8 border-t-0 border-r-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-[1px] bg-ink/5" />
            <div className="h-full w-[1px] bg-ink/5 absolute" />
          </div>

          {/* Quadrant Labels */}
          <div className="absolute top-12 left-12 text-[8px] font-bold uppercase tracking-tighter text-gold/60">Do First (High ROI)</div>
          <div className="absolute top-12 right-12 text-[8px] font-bold uppercase tracking-tighter opacity-20">Strategic Projects</div>
          <div className="absolute bottom-12 left-12 text-[8px] font-bold uppercase tracking-tighter opacity-20">Quick Wins</div>
          <div className="absolute bottom-12 right-12 text-[8px] font-bold uppercase tracking-tighter opacity-20">Reconsider</div>

          {/* Tasks onto Grid */}
          <div className="absolute inset-8 pointer-events-none">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layoutId={task.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute w-3 h-3 rounded-full bg-gold shadow-[0_0_10px_rgba(197,160,89,0.5)] pointer-events-auto cursor-help group"
                style={{
                  left: `${task.effort}%`,
                  bottom: `${task.impact}%`,
                  transform: 'translate(-50%, 50%)'
                }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-ink text-paper text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {task.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Task Management */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest opacity-40">Add Potential Action</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="What action are you considering?"
                className="w-full bg-transparent border-b border-ink/10 focus:border-gold py-2 outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold opacity-40">
                    <span>Impact</span>
                    <span>{newTask.impact}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newTask.impact}
                    onChange={(e) => setNewTask({ ...newTask, impact: parseInt(e.target.value) })}
                    className="w-full accent-gold"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold opacity-40">
                    <span>Effort</span>
                    <span>{newTask.effort}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newTask.effort}
                    onChange={(e) => setNewTask({ ...newTask, effort: parseInt(e.target.value) })}
                    className="w-full accent-gold"
                  />
                </div>
              </div>
              <button
                onClick={addTask}
                className="w-full premium-btn premium-btn-primary flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Analyze & Prioritize
              </button>
            </div>
          </div>

          <div className="p-4 space-y-3 overflow-y-auto max-h-[300px]">
             <h3 className="text-[10px] uppercase tracking-widest font-bold opacity-30 border-b border-ink/5 pb-2">Matrix Directory</h3>
             <AnimatePresence>
               {tasks.sort((a, b) => (b.impact / b.effort) - (a.impact / a.effort)).map((task) => (
                 <motion.div
                   key={task.id}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="flex items-center justify-between p-3 rounded-lg bg-white/30 border border-ink/[0.03] group"
                 >
                   <div className="flex items-center gap-3">
                     <div className={cn(
                       "w-2 h-2 rounded-full",
                       (task.impact > 70 && task.effort < 40) ? "bg-gold" : "bg-ink/10"
                     )} />
                     <span className="text-sm font-medium">{task.title}</span>
                   </div>
                   <div className="flex items-center gap-4">
                     <span className="font-mono text-[10px] opacity-40">ROI: {Math.round((task.impact / Math.max(task.effort, 1)) * 10) / 10}x</span>
                     <button onClick={() => removeTask(task.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all">
                       <X className="w-3 h-3" />
                     </button>
                   </div>
                 </motion.div>
               ))}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
