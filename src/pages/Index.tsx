import { useState } from 'react';
import { AtomTier } from '@/data/atoms';
import { Atom } from '@/data/atoms';
import { JungleSidebar } from '@/components/JungleSidebar';
import { AtomCanvas } from '@/components/AtomCanvas';
import { InfoPanel } from '@/components/InfoPanel';

const Index = () => {
  const [activeTier, setActiveTier] = useState<AtomTier | null>(null);
  const [selectedAtom, setSelectedAtom] = useState<Atom | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleTierSelect = (tier: AtomTier) => {
    setActiveTier(prev => prev === tier ? null : tier);
    setSelectedAtom(null);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <JungleSidebar
        activeTier={activeTier}
        onTierSelect={handleTierSelect}
        onShowAll={() => { setActiveTier(null); setSelectedAtom(null); }}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(c => !c)}
      />
      <div className="flex-1 relative min-w-0 h-full">
        <AtomCanvas
          activeTier={activeTier}
          selectedAtom={selectedAtom}
          onSelectAtom={setSelectedAtom}
        />
        <InfoPanel
          atom={selectedAtom}
          onClose={() => setSelectedAtom(null)}
        />
      </div>
    </div>
  );
};

export default Index;
