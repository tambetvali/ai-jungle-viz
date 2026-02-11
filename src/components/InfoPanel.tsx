import { Atom, AtomTier, THERMODYNAMICS } from '@/data/atoms';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface InfoPanelProps {
  atom: Atom | null;
  onClose: () => void;
}

const TIER_HSL: Record<AtomTier, string> = {
  quantum: '280, 60%, 55%',
  gpu: '175, 80%, 45%',
  cpu: '35, 90%, 55%',
  meta: '145, 70%, 40%',
};

const TIER_LABELS: Record<AtomTier, string> = {
  quantum: 'Quantum Tier',
  gpu: 'GPU Exp-Field',
  cpu: 'CPU Log-Conv',
  meta: 'Emergent Meta',
};

export function InfoPanel({ atom, onClose }: InfoPanelProps) {
  if (!atom) return null;
  const hsl = TIER_HSL[atom.tier];
  const color = `hsl(${hsl})`;
  const textGlow = `0 0 8px hsl(${hsl} / 0.6), 0 0 20px hsl(${hsl} / 0.3)`;

  return (
    <AnimatePresence>
      {atom && (
        <motion.div
          key={atom.id}
          className="absolute bottom-4 right-4 w-80 bg-card/90 backdrop-blur-md border border-border rounded-lg overflow-hidden z-30"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex items-center justify-between" style={{ backgroundColor: `hsl(${hsl} / 0.05)` }}>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: color, backgroundColor: `hsl(${hsl} / 0.1)` }}
              >
                <span className="text-sm font-bold font-display" style={{ color, textShadow: textGlow }}>{atom.symbol}</span>
              </div>
              <div>
                <h3 className="font-display text-sm text-foreground">{atom.name}</h3>
                <span className="text-[10px] text-muted-foreground font-mono">#{atom.id} · {TIER_LABELS[atom.tier]}</span>
              </div>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 text-xs font-mono">
            <div className="text-center py-2">
              <span className="text-2xl tracking-widest" style={{ color, textShadow: textGlow }}>{atom.utf8Art}</span>
            </div>

            <div>
              <span className="text-muted-foreground">⊛ Function:</span>
              <p className="text-foreground mt-1">{atom.meaning}</p>
            </div>

            <div className="flex gap-4">
              <div>
                <span className="text-muted-foreground">Valence:</span>
                <span className="text-foreground ml-1">{atom.valence}</span>
              </div>
              {atom.costFormula && (
                <div>
                  <span className="text-muted-foreground">Cost:</span>
                  <span className="ml-1" style={{ color }}>{atom.costFormula}</span>
                </div>
              )}
            </div>

            <div>
              <span className="text-muted-foreground">⊕ Bonds with:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {atom.bonds.map(b => (
                  <span key={b} className="px-1.5 py-0.5 rounded bg-muted text-foreground text-[10px]">{b}</span>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-2 mt-2">
              <span className="text-muted-foreground">⟨ Mock Thermodynamics ⟩</span>
              <div className="mt-1 space-y-0.5 text-[10px] text-muted-foreground">
                <div>E = {THERMODYNAMICS.energy}</div>
                <div>S = {THERMODYNAMICS.entropy}</div>
                <div>F = {THERMODYNAMICS.freeCompute}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
