import { motion } from 'framer-motion';
import { Atom, TIER_COLORS, AtomTier } from '@/data/atoms';

interface AtomNodeProps {
  atom: Atom;
  isSelected: boolean;
  isFocused: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

const TIER_HSL: Record<AtomTier, string> = {
  quantum: '280, 60%, 55%',
  gpu: '175, 80%, 45%',
  cpu: '35, 90%, 55%',
  meta: '145, 70%, 40%',
};

export function AtomNode({ atom, isSelected, isFocused, onClick }: AtomNodeProps) {
  const hsl = TIER_HSL[atom.tier];
  const color = `hsl(${hsl})`;
  const colorFaint = `hsl(${hsl} / 0.1)`;
  const colorGlow = `0 0 8px hsl(${hsl} / 0.4), 0 0 24px hsl(${hsl} / 0.15)`;
  const textGlow = `0 0 8px hsl(${hsl} / 0.6), 0 0 20px hsl(${hsl} / 0.3)`;

  return (
    <motion.div
      className={`relative cursor-pointer select-none ${isSelected ? 'z-20' : 'z-10'}`}
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Outer glow ring */}
      {isSelected && (
        <motion.div
          className="absolute inset-[-6px] rounded-full border-2 opacity-60"
          style={{ borderColor: color }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Electron orbits */}
      {Array.from({ length: Math.min(atom.valence, 3) }).map((_, i) => (
        <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="absolute rounded-full"
            style={{
              width: `${70 + i * 20}px`,
              height: `${70 + i * 20}px`,
              border: `1px solid hsl(${hsl} / 0.2)`,
            }}
          />
          <div
            className="orbit-electron absolute"
            style={{
              '--orbit-r': `${35 + i * 10}px`,
              '--orbit-dur': `${3 + i * 1.5}s`,
              animationDelay: `${i * 0.7}s`,
            } as React.CSSProperties}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
          </div>
        </div>
      ))}

      {/* Core */}
      <div
        className={`relative w-14 h-14 rounded-full flex flex-col items-center justify-center border-2 backdrop-blur-sm transition-all duration-300 ${isFocused ? 'atom-pulse' : ''}`}
        style={{
          borderColor: color,
          backgroundColor: colorFaint,
          boxShadow: isSelected ? colorGlow : 'none',
        }}
      >
        <span className="text-xs font-bold font-display" style={{ color, textShadow: textGlow }}>
          {atom.symbol}
        </span>
        <span className="text-[8px] text-muted-foreground">{atom.id}</span>
      </div>

      {/* Label */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-[9px] text-muted-foreground font-mono">{atom.name}</span>
      </div>

      {/* UTF-8 art */}
      {isSelected && (
        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-xs font-mono" style={{ color, textShadow: textGlow }}>{atom.utf8Art}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
