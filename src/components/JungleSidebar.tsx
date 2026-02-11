import { AtomTier, TIER_LABELS } from '@/data/atoms';
import { motion } from 'framer-motion';
import { Atom, Zap, Cpu, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface JungleSidebarProps {
  activeTier: AtomTier | null;
  onTierSelect: (tier: AtomTier) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const TIER_HSL: Record<AtomTier, string> = {
  quantum: '280, 60%, 55%',
  gpu: '175, 80%, 45%',
  cpu: '35, 90%, 55%',
  meta: '145, 70%, 40%',
};

const tiers: { tier: AtomTier; icon: React.ElementType; desc: string }[] = [
  { tier: 'quantum', icon: Zap, desc: 'Sub-atomic micro-kernels' },
  { tier: 'gpu', icon: Sparkles, desc: 'Exp-field parallel atoms' },
  { tier: 'cpu', icon: Cpu, desc: 'Log-conversion linear atoms' },
  { tier: 'meta', icon: Atom, desc: 'Emergent meta patterns' },
];

export function JungleSidebar({ activeTier, onTierSelect, collapsed, onToggle }: JungleSidebarProps) {
  return (
    <motion.aside
      className="h-full bg-card/80 backdrop-blur-md border-r border-border flex flex-col z-40 relative shrink-0"
      animate={{ width: collapsed ? 48 : 220 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <button
        onClick={onToggle}
        className="absolute -right-3 top-4 z-50 w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {!collapsed && (
        <div className="px-4 py-4 border-b border-border">
          <h2 className="font-display text-xs text-primary tracking-wider" style={{ textShadow: '0 0 8px hsl(175, 80%, 45% / 0.6)' }}>AI JUNGLE</h2>
          <p className="text-[9px] text-muted-foreground mt-1">Mock-Physics Explorer</p>
        </div>
      )}

      <nav className="flex-1 py-2">
        {tiers.map(({ tier, icon: Icon, desc }) => {
          const active = activeTier === tier;
          const hsl = TIER_HSL[tier];
          const color = `hsl(${hsl})`;
          return (
            <button
              key={tier}
              onClick={() => onTierSelect(tier)}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-200 hover:bg-muted/50"
              style={active ? { backgroundColor: `hsl(${hsl} / 0.1)`, borderRight: `2px solid ${color}` } : {}}
            >
              <Icon size={16} style={{ color: active ? color : undefined }} className={active ? '' : 'text-muted-foreground'} />
              {!collapsed && (
                <div className="overflow-hidden">
                  <div className="text-xs font-display tracking-wide" style={active ? { color, textShadow: `0 0 8px hsl(${hsl} / 0.4)` } : { color: 'hsl(var(--foreground))' }}>
                    {TIER_LABELS[tier]}
                  </div>
                  <div className="text-[9px] text-muted-foreground truncate">{desc}</div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="px-4 py-3 border-t border-border space-y-1.5">
          <span className="text-[9px] text-muted-foreground font-display tracking-wider">BOND TYPES</span>
          <div className="space-y-1">
            {[
              { label: 'Tensor', hsl: '175, 80%, 45%', sym: '━━' },
              { label: 'Graph', hsl: '35, 90%, 55%', sym: '──' },
              { label: 'Convert', hsl: '280, 60%, 55%', sym: '⇄' },
              { label: 'Residual', hsl: '145, 70%, 40%', sym: '≡≡' },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-2 text-[9px]">
                <span className="font-mono" style={{ color: `hsl(${b.hsl})` }}>{b.sym}</span>
                <span className="text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!collapsed && (
        <div className="px-4 py-3 border-t border-border">
          <pre className="text-[7px] text-muted-foreground leading-tight font-mono text-center whitespace-pre">
{`    ⊛∿∿∿⊛
  ↻⊙──⊗→⊕──∞⊛
⟨ψ⟩──♀⊛──♂⊛──⊛∞⊛
  ∿≡∿──◇⊛◇──∇→∇
    ⊘!──∞Æ∞`}
          </pre>
        </div>
      )}
    </motion.aside>
  );
}
