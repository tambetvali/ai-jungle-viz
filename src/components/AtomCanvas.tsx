import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { atoms, Atom, AtomTier, TIER_LABELS } from '@/data/atoms';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface AtomCanvasProps {
  activeTier: AtomTier | null;
  selectedAtom: Atom | null;
  onSelectAtom: (atom: Atom | null) => void;
}

const TIER_ORDER: AtomTier[] = ['quantum', 'gpu', 'cpu', 'meta'];

const TIER_HSL: Record<AtomTier, string> = {
  quantum: '280, 60%, 55%',
  gpu: '175, 80%, 45%',
  cpu: '35, 90%, 55%',
  meta: '145, 70%, 40%',
};

function layoutAtoms(filteredAtoms: Atom[]) {
  const positions: Map<number, { x: number; y: number }> = new Map();
  const grouped: Record<AtomTier, Atom[]> = { quantum: [], gpu: [], cpu: [], meta: [] };
  filteredAtoms.forEach(a => grouped[a.tier].push(a));

  let yOffset = 80;
  TIER_ORDER.forEach(tier => {
    const group = grouped[tier];
    if (group.length === 0) return;
    const cols = Math.min(group.length, 8);
    const spacing = 110;
    const startX = 80;
    group.forEach((atom, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      positions.set(atom.id, { x: startX + col * spacing, y: yOffset + row * 100 });
    });
    const rows = Math.ceil(group.length / cols);
    yOffset += rows * 100 + 80;
  });

  return { positions, totalHeight: yOffset };
}

export function AtomCanvas({ activeTier, selectedAtom, onSelectAtom }: AtomCanvasProps) {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const filtered = activeTier ? atoms.filter(a => a.tier === activeTier) : atoms;
  const { positions, totalHeight } = layoutAtoms(filtered);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const step = 80;
      switch (e.key) {
        case 'ArrowUp': setPan(p => ({ ...p, y: p.y + step })); break;
        case 'ArrowDown': setPan(p => ({ ...p, y: p.y - step })); break;
        case 'ArrowLeft': setPan(p => ({ ...p, x: p.x + step })); break;
        case 'ArrowRight': setPan(p => ({ ...p, x: p.x - step })); break;
        case '+': case '=': setZoom(z => Math.min(z + 0.15, 2.5)); break;
        case '-': setZoom(z => Math.max(z - 0.15, 0.3)); break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }, []);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return;
    setPan(p => ({
      x: p.x + (e.clientX - lastMouse.current.x),
      y: p.y + (e.clientY - lastMouse.current.y),
    }));
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }, []);
  const onMouseUp = useCallback(() => { dragging.current = false; }, []);

  // Bond lines
  const bondLines: { x1: number; y1: number; x2: number; y2: number; tier: AtomTier }[] = [];
  filtered.forEach(atom => {
    const pos = positions.get(atom.id);
    if (!pos) return;
    atom.bonds.forEach(bondSymbol => {
      const target = filtered.find(a => a.symbol === bondSymbol);
      if (!target) return;
      const tPos = positions.get(target.id);
      if (!tPos) return;
      if (atom.id < target.id) {
        bondLines.push({ x1: pos.x + 28, y1: pos.y + 28, x2: tPos.x + 28, y2: tPos.y + 28, tier: atom.tier });
      }
    });
  });

  return (
    <div
      className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ background: 'hsl(180, 15%, 4%)' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={(e) => {
        e.preventDefault();
        setZoom(z => Math.min(Math.max(z - e.deltaY * 0.001, 0.3), 2.5));
      }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.06,
          backgroundImage: `
            linear-gradient(hsl(175, 80%, 45%, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(175, 80%, 45%, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `translate(${pan.x % 60}px, ${pan.y % 60}px)`,
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 3, height: 3,
            backgroundColor: 'hsl(175, 80%, 45%)',
            opacity: 0.2,
            left: `${10 + (i * 37) % 80}%`,
            top: `${5 + (i * 53) % 80}%`,
          }}
          animate={{ y: [0, -15, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none" style={{ zIndex: 20 }}>
        <h1 className="font-display text-lg tracking-[0.4em]" style={{ color: 'hsl(175, 80%, 45%)', textShadow: '0 0 12px hsl(175, 80%, 45%, 0.5)' }}>
          AI ATOM JUNGLE
        </h1>
        <p className="text-[9px] tracking-widest mt-1" style={{ color: 'hsl(170, 20%, 50%)' }}>
          MOCK-PHYSICS PERIODIC TABLE · GPT MOLECULAR ARCHITECTURE
        </p>
      </div>

      {/* Canvas transform layer */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 1200,
          height: totalHeight + 200,
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          zIndex: 10,
        }}
      >
        {/* Bond SVG */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          {bondLines.map((line, i) => {
            const c = line.tier === 'quantum' ? 'hsl(280,60%,55%)' :
              line.tier === 'gpu' ? 'hsl(175,80%,45%)' :
              line.tier === 'cpu' ? 'hsl(35,90%,55%)' :
              'hsl(145,70%,40%)';
            return (
              <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                stroke={c} strokeWidth={1} strokeOpacity={0.2} strokeDasharray="4 4" />
            );
          })}
        </svg>

        {/* Tier labels */}
        {TIER_ORDER.map(tier => {
          const tierAtoms = filtered.filter(a => a.tier === tier);
          if (tierAtoms.length === 0) return null;
          const firstPos = positions.get(tierAtoms[0].id);
          if (!firstPos) return null;
          return (
            <div key={tier} className="font-display text-[10px] tracking-[0.3em]"
              style={{ position: 'absolute', left: 20, top: firstPos.y - 30, color: 'hsl(170, 20%, 50%)' }}>
              {TIER_LABELS[tier]}
            </div>
          );
        })}

        {/* Atom nodes */}
        {filtered.map(atom => {
          const pos = positions.get(atom.id);
          if (!pos) return null;
          const hsl = TIER_HSL[atom.tier];
          const color = `hsl(${hsl})`;
          const isSelected = selectedAtom?.id === atom.id;
          const glowShadow = `0 0 10px hsl(${hsl} / 0.5), 0 0 30px hsl(${hsl} / 0.2)`;

          return (
            <motion.div
              key={atom.id}
              style={{
                position: 'absolute',
                left: pos.x,
                top: pos.y,
                cursor: 'pointer',
                zIndex: isSelected ? 20 : 10,
              }}
              onClick={(e) => { e.stopPropagation(); onSelectAtom(isSelected ? null : atom); }}
              whileHover={{ scale: 1.15 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: atom.id * 0.02 }}
            >
              {/* Electron orbits */}
              {Array.from({ length: Math.min(atom.valence, 3) }).map((_, i) => (
                <div key={i} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <div style={{
                    position: 'absolute',
                    width: 70 + i * 20, height: 70 + i * 20,
                    borderRadius: '50%',
                    border: `1px solid hsl(${hsl} / 0.15)`,
                  }} />
                  <div className="orbit-electron" style={{
                    position: 'absolute',
                    '--orbit-r': `${35 + i * 10}px`,
                    '--orbit-dur': `${3 + i * 1.5}s`,
                    animationDelay: `${i * 0.7}s`,
                  } as React.CSSProperties}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: color }} />
                  </div>
                </div>
              ))}

              {/* Selected ring */}
              {isSelected && (
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: -6,
                    borderRadius: '50%',
                    border: `2px solid ${color}`,
                  }}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Core circle */}
              <div style={{
                position: 'relative',
                width: 56, height: 56,
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px solid ${color}`,
                backgroundColor: `hsl(${hsl} / 0.1)`,
                boxShadow: isSelected ? glowShadow : 'none',
                backdropFilter: 'blur(4px)',
                transition: 'box-shadow 0.3s',
              }}>
                <span className="font-display" style={{
                  fontSize: 12, fontWeight: 700,
                  color, textShadow: `0 0 8px hsl(${hsl} / 0.6)`,
                }}>{atom.symbol}</span>
                <span style={{ fontSize: 8, color: 'hsl(170, 20%, 50%)' }}>{atom.id}</span>
              </div>

              {/* Name label */}
              <div style={{
                position: 'absolute', bottom: -18, left: '50%', transform: 'translateX(-50%)',
                whiteSpace: 'nowrap', fontSize: 9, color: 'hsl(170, 20%, 50%)',
                fontFamily: "'JetBrains Mono', monospace",
              }}>{atom.name}</div>

              {/* UTF-8 art on select */}
              {isSelected && (
                <motion.div
                  style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                >
                  <span style={{
                    fontSize: 12, color,
                    textShadow: `0 0 8px hsl(${hsl} / 0.6)`,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{atom.utf8Art}</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Nav arrows */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1" style={{ zIndex: 30 }}>
        {[
          { icon: ChevronLeft, fn: () => setPan(p => ({ ...p, x: p.x + 80 })) },
          { icon: ChevronUp, fn: () => setPan(p => ({ ...p, y: p.y + 80 })) },
          { icon: ChevronDown, fn: () => setPan(p => ({ ...p, y: p.y - 80 })) },
          { icon: ChevronRight, fn: () => setPan(p => ({ ...p, x: p.x - 80 })) },
        ].map(({ icon: Icon, fn }, i) => (
          <button key={i} onClick={fn} style={{
            width: 32, height: 32, borderRadius: 6,
            background: 'hsl(180, 10%, 12%, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'hsl(170, 20%, 50%)', border: 'none', cursor: 'pointer',
          }}>
            <Icon size={14} />
          </button>
        ))}
      </div>

      {/* Zoom */}
      <div className="absolute top-4 right-4 flex flex-col gap-1" style={{ zIndex: 30 }}>
        <button onClick={() => setZoom(z => Math.min(z + 0.2, 2.5))} style={{
          width: 32, height: 32, borderRadius: 6,
          background: 'hsl(180, 10%, 12%, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'hsl(170, 20%, 50%)', border: 'none', cursor: 'pointer',
        }}>
          <ZoomIn size={14} />
        </button>
        <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.3))} style={{
          width: 32, height: 32, borderRadius: 6,
          background: 'hsl(180, 10%, 12%, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'hsl(170, 20%, 50%)', border: 'none', cursor: 'pointer',
        }}>
          <ZoomOut size={14} />
        </button>
        <div style={{ fontSize: 9, color: 'hsl(170, 20%, 50%)', textAlign: 'center', marginTop: 4 }}>
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 2,
        background: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(175, 80%, 45%, 0.012) 2px, hsl(175, 80%, 45%, 0.012) 4px)`,
      }} />
    </div>
  );
}
