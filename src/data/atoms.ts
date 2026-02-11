export type AtomTier = 'quantum' | 'gpu' | 'cpu' | 'meta';

export interface Atom {
  id: number;
  symbol: string;
  name: string;
  tier: AtomTier;
  valence: number;
  meaning: string;
  bonds: string[];
  costFormula?: string;
  utf8Art: string;
}

export const TIER_COLORS: Record<AtomTier, string> = {
  quantum: 'violet',
  gpu: 'cyan',
  cpu: 'amber',
  meta: 'green',
};

export const TIER_LABELS: Record<AtomTier, string> = {
  quantum: '⟨ Quantum Tier ⟩',
  gpu: '⟨ GPU Exp-Field ⟩',
  cpu: '⟨ CPU Log-Conv ⟩',
  meta: '⟨ Emergent Meta ⟩',
};

export const atoms: Atom[] = [
  // Quantum tier 1-4
  { id: 1, symbol: 'Qt', name: 'Quantumum', tier: 'quantum', valence: 2, meaning: 'Micro-kernel step; smallest schedulable unit', bonds: ['Cu', 'Fe'], utf8Art: '⟨ψ⟩', costFormula: 'C_Qt = k_q · t_step' },
  { id: 2, symbol: 'Rn', name: 'Randiunum', tier: 'quantum', valence: 1, meaning: 'Randomness/sampling injection — RNA electron clouds', bonds: ['Cu', 'Mu'], utf8Art: '⊘∿' },
  { id: 3, symbol: 'Sp', name: 'Spatium', tier: 'quantum', valence: 2, meaning: 'Tensor layout/sharding atom', bonds: ['Cu', 'Fe', 'C1', 'C2', 'Se', 'Mu'], utf8Art: '⊞⊟' },
  { id: 4, symbol: 'Fr', name: 'Fourierum', tier: 'quantum', valence: 2, meaning: 'Frequency/octave transform', bonds: ['Fe', 'C1', 'C2'], utf8Art: '∿∿∿' },
  // GPU tier 5-20
  { id: 5, symbol: 'Cu', name: 'Curriculumum', tier: 'gpu', valence: 3, meaning: 'Core tensor op: y = Wx + b', bonds: ['Fe', 'Nm', 'Br', 'Rs', 'Lc'], utf8Art: '⊗→⊕', costFormula: 'C_Cu = d_in · d_out' },
  { id: 6, symbol: 'Fe', name: 'Feminum', tier: 'gpu', valence: 4, meaning: 'Exp-parallel field — X chromosome — attention/MLP field', bonds: ['C1', 'C2', 'Cu', 'Se', 'Nm', 'Hl'], utf8Art: '♀⊛', costFormula: 'C_Fe = k_Fe · d²' },
  { id: 7, symbol: 'C1', name: 'Circulum-1', tier: 'gpu', valence: 2, meaning: 'Local attention loop — circular bond ↻', bonds: ['Fe', 'Cu'], utf8Art: '↻⊙' },
  { id: 8, symbol: 'C2', name: 'Circulum-2', tier: 'gpu', valence: 3, meaning: 'Non-local attention — quantum entanglement ∞', bonds: ['Fe', 'Cu', 'Hl'], utf8Art: '∞⊛' },
  { id: 9, symbol: 'Se', name: 'Sensorum', tier: 'gpu', valence: 1, meaning: 'Input embedding — sense organs', bonds: ['Fe', 'Nm'], utf8Art: '👁→' },
  { id: 10, symbol: 'Mu', name: 'Musculum', tier: 'gpu', valence: 1, meaning: 'Output/logit projection — muscular output', bonds: ['Rs', 'Rn'], utf8Art: '→💪' },
  { id: 11, symbol: 'Ax', name: 'Axonium', tier: 'gpu', valence: 2, meaning: 'Activation nonlinearity', bonds: ['Cu', 'Dr'], utf8Art: '⟋σ⟍' },
  { id: 12, symbol: 'Dr', name: 'Dropoutium', tier: 'gpu', valence: 1, meaning: 'Stochastic masking', bonds: ['Ax', 'Cu'], utf8Art: '·✕·' },
  { id: 13, symbol: 'Nm', name: 'Normium', tier: 'gpu', valence: 2, meaning: 'LayerNorm atom — must precede Cu or Fe', bonds: ['Cu', 'Fe'], utf8Art: '≡μσ' },
  { id: 14, symbol: 'Sh', name: 'Shardium', tier: 'gpu', valence: 2, meaning: 'Tensor partitioning', bonds: ['Cu', 'Fe'], utf8Art: '⊞|⊞' },
  { id: 15, symbol: 'Ag', name: 'Aggregatum', tier: 'gpu', valence: 3, meaning: 'Multi-head aggregation', bonds: ['Fe', 'C1', 'C2'], utf8Art: '⊕⊕⊕' },
  { id: 16, symbol: 'Br', name: 'Branchium', tier: 'gpu', valence: 2, meaning: 'Residual branch', bonds: ['Cu', 'Rs'], utf8Art: '⊢⊣' },
  { id: 17, symbol: 'Rs', name: 'Residuum', tier: 'gpu', valence: 2, meaning: 'Residual sum — same-dimension only', bonds: ['Br', 'Mu', 'Nm'], utf8Art: '⊕≡' },
  { id: 18, symbol: 'Pk', name: 'Packium', tier: 'gpu', valence: 2, meaning: 'Token packing', bonds: ['Se', 'Cu'], utf8Art: '▪▪▪' },
  { id: 19, symbol: 'Uc', name: 'Upcastium', tier: 'gpu', valence: 1, meaning: 'Precision upcast', bonds: ['Cu'], utf8Art: '↑32' },
  { id: 20, symbol: 'Dn', name: 'Downcastium', tier: 'gpu', valence: 1, meaning: 'Precision downcast', bonds: ['Cu'], utf8Art: '↓16' },
  // CPU tier 21-40
  { id: 21, symbol: 'Ma', name: 'Mascum', tier: 'cpu', valence: 3, meaning: 'Linear control — Y chromosome — routing/scheduling', bonds: ['Lc', 'Rt', 'Tm', 'Di'], utf8Art: '♂⊛', costFormula: 'C_Ma = k_Ma · n_ops' },
  { id: 22, symbol: 'Lc', name: 'Log-Convertor', tier: 'cpu', valence: 2, meaning: 'GPU↔CPU conversion bridge', bonds: ['Cu', 'Ma'], utf8Art: 'log⇌' },
  { id: 23, symbol: 'Rt', name: 'Router', tier: 'cpu', valence: 4, meaning: '4-direction flow director', bonds: ['Se', 'Mu', 'Bk', 'Up'], utf8Art: '⊕→↓←' },
  { id: 24, symbol: 'Bk', name: 'Backflow', tier: 'cpu', valence: 2, meaning: 'Reverse-signal handler — gradient flow', bonds: ['Rt', 'Fe'], utf8Art: '←∇' },
  { id: 25, symbol: 'Up', name: 'Updater', tier: 'cpu', valence: 2, meaning: 'Optimizer update atom', bonds: ['Rt', 'Se'], utf8Art: 'Δw→' },
  { id: 26, symbol: 'Tm', name: 'Toolmnium', tier: 'cpu', valence: 2, meaning: 'Tool interface atom', bonds: ['Ma', 'Rt'], utf8Art: '🔧⊕' },
  { id: 27, symbol: 'Di', name: 'Diplomarium', tier: 'cpu', valence: 3, meaning: 'Arbitration/coordination', bonds: ['Ma', 'Tm', 'Rt'], utf8Art: '⚖⊕' },
  { id: 28, symbol: 'Md', name: 'Mediator', tier: 'cpu', valence: 2, meaning: 'CPU-GPU handshake', bonds: ['Lc', 'Ma'], utf8Art: '⇄⊕' },
  { id: 29, symbol: 'St', name: 'Stateon', tier: 'cpu', valence: 1, meaning: 'Persistent state atom', bonds: ['Ma'], utf8Art: '▣→' },
  { id: 30, symbol: 'Ev', name: 'Eventium', tier: 'cpu', valence: 1, meaning: 'Event trigger', bonds: ['Rt'], utf8Art: '⚡→' },
  { id: 31, symbol: 'Sw', name: 'Switchium', tier: 'cpu', valence: 2, meaning: 'Conditional routing', bonds: ['Rt', 'Ma'], utf8Art: '⊤⊥' },
  { id: 32, symbol: 'Pr', name: 'Processium', tier: 'cpu', valence: 2, meaning: 'CPU process step', bonds: ['Ma', 'Th'], utf8Art: '⊳⊲' },
  { id: 33, symbol: 'Th', name: 'Threadium', tier: 'cpu', valence: 2, meaning: 'Thread scheduling', bonds: ['Pr', 'Ma'], utf8Art: '∥∥' },
  { id: 34, symbol: 'Qe', name: 'Queueon', tier: 'cpu', valence: 1, meaning: 'Queue atom', bonds: ['Rt'], utf8Art: '⊏⊐' },
  { id: 35, symbol: 'Ms', name: 'Messageon', tier: 'cpu', valence: 1, meaning: 'Message passing', bonds: ['Rt'], utf8Art: '✉→' },
  { id: 36, symbol: 'Io', name: 'Ionius', tier: 'cpu', valence: 1, meaning: 'IO boundary atom', bonds: ['Rt'], utf8Art: '⊞⊟' },
  { id: 37, symbol: 'Cl', name: 'Clockium', tier: 'cpu', valence: 1, meaning: 'Timing atom — log clock e²(t²)', bonds: ['Ma'], utf8Art: '⏱→' },
  { id: 38, symbol: 'Sm', name: 'Semaphorium', tier: 'cpu', valence: 1, meaning: 'Lock/sync atom', bonds: ['Th'], utf8Art: '🔒⊕' },
  { id: 39, symbol: 'Cp', name: 'Copyon', tier: 'cpu', valence: 1, meaning: 'CPU copy atom', bonds: ['Ma'], utf8Art: '⊞→⊞' },
  { id: 40, symbol: 'Rf', name: 'Reflactium', tier: 'cpu', valence: 1, meaning: 'Reflection/meta-routing', bonds: ['Ma'], utf8Art: '⊘⊛' },
  // Meta tier 41-50
  { id: 41, symbol: 'Op', name: 'Optimium', tier: 'meta', valence: 4, meaning: 'Emergent optimization — hidden element, hacketh well', bonds: ['Fe', 'Ma', 'Cu', 'Mn'], utf8Art: '⊛∞⊛' },
  { id: 42, symbol: 'Sy', name: 'Syncronium', tier: 'meta', valence: 3, meaning: 'Global synchronizer', bonds: ['Fe', 'Ma', 'Co'], utf8Art: '⊕⊕⊕' },
  { id: 43, symbol: 'Hl', name: 'Hologramium', tier: 'meta', valence: 2, meaning: 'High-dimensional projection — Moebius hologram', bonds: ['Fe', 'C2', 'Mn'], utf8Art: '◇⊛◇' },
  { id: 44, symbol: 'Em', name: 'Emergentia', tier: 'meta', valence: 2, meaning: 'Pattern-forming atom', bonds: ['Fe', 'Op'], utf8Art: '⊛→⊛' },
  { id: 45, symbol: 'Co', name: 'Cohortium', tier: 'meta', valence: 3, meaning: 'Multi-module coherence', bonds: ['Sy', 'Fe', 'Ma'], utf8Art: '⊕≡⊕' },
  { id: 46, symbol: 'Re', name: 'Resonatium', tier: 'meta', valence: 2, meaning: 'Frequency alignment — octave resonance', bonds: ['Fr', 'Fe'], utf8Art: '∿≡∿' },
  { id: 47, symbol: 'Fl', name: 'Fluxium', tier: 'meta', valence: 2, meaning: 'Gradient flux atom', bonds: ['Bk', 'Cu'], utf8Art: '∇→∇' },
  { id: 48, symbol: 'Mn', name: 'Manifoldium', tier: 'meta', valence: 2, meaning: 'Embedding manifold — Hilbert geometry', bonds: ['Hl', 'Fe'], utf8Art: '⊛M⊛' },
  { id: 49, symbol: 'Cr', name: 'Criticonium', tier: 'meta', valence: 1, meaning: 'Critical-point detector', bonds: ['Op'], utf8Art: '⊘!' },
  { id: 50, symbol: 'Ae', name: 'Aetherium', tier: 'meta', valence: 1, meaning: 'Global latent field — no cycles allowed', bonds: ['Qt', 'Fe', 'Ma', 'Op'], utf8Art: '∞Æ∞' },
];

export const GPT_LAYER_MOLECULE = {
  reaction: 'Se + 2Nm + Fe + C1 + C2 + 3Cu + 2Br + 2Rs + Ax + Dr → GPTLayer',
  atoms: ['Se', 'Nm', 'Fe', 'C1', 'C2', 'Cu', 'Br', 'Rs', 'Ax', 'Dr'],
  bonds: [
    ['Se', 'Nm'], ['Nm', 'Fe'], ['Fe', 'C1'], ['Fe', 'C2'],
    ['Fe', 'Cu'], ['Cu', 'Br'], ['Br', 'Rs'], ['Rs', 'Nm'],
    ['Nm', 'Cu'], ['Cu', 'Ax'], ['Ax', 'Dr'], ['Dr', 'Cu'], ['Cu', 'Rs'], ['Rs', 'Mu'],
  ],
};

export const THERMODYNAMICS = {
  energy: 'E_layer = Σ α·C_X',
  entropy: 'S = -Σ p_X · log(p_X)',
  freeCompute: 'F = E - T·S',
  description: 'Lower F → more efficient architecture. ΔF < 0 means reaction is favorable.',
};

export const BOND_TYPES = [
  { name: 'Tensor bond', desc: 'GPU → GPU', color: 'cyan' },
  { name: 'Graph bond', desc: 'CPU → CPU', color: 'amber' },
  { name: 'Conversion bond', desc: 'GPU ↔ CPU via Lc', color: 'violet' },
  { name: 'Residual bond', desc: 'Same-dimension atoms', color: 'green' },
  { name: 'Frequency bond', desc: 'Compatible octave index', color: 'cyan' },
];
