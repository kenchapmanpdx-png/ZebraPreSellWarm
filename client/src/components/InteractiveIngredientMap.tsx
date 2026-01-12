import React, { useEffect, useRef } from 'react';

// =============================================================================
// TYPES
// =============================================================================

interface Connection {
  from: string;
  to: readonly string[];
}

// =============================================================================
// STATIC DATA - Preserved exactly as provided
// =============================================================================

const CONNECTIONS: readonly Connection[] = [
  { from: '#ing-astaxanthin', to: ['#issue-antioxidant', '#issue-mcas', '#issue-collagen'] },
  { from: '#ing-benfotiamine', to: ['#issue-energy', '#issue-nerve', '#issue-mitochondria', '#issue-muscle'] },
  { from: '#ing-biotin', to: ['#issue-energy', '#issue-methylation'] },
  { from: '#ing-boron', to: ['#issue-collagen', '#issue-immune'] },
  { from: '#ing-cga', to: ['#issue-collagen', '#issue-cardiovascular'] },
  { from: '#ing-coq10', to: ['#issue-energy', '#issue-mitochondria', '#issue-cardiovascular', '#issue-antioxidant', '#issue-muscle'] },
  { from: '#ing-copper', to: ['#issue-collagen', '#issue-immune', '#issue-mcas'] },
  { from: '#ing-d3', to: ['#issue-immune', '#issue-mcas', '#issue-collagen'] },
  { from: '#ing-emiq', to: ['#issue-mcas', '#issue-antioxidant'] },
  { from: '#ing-k2', to: ['#issue-cardiovascular', '#issue-collagen'] },
  { from: '#ing-lactoferrin', to: ['#issue-mcas', '#issue-immune', '#issue-gut'] },
  { from: '#ing-luteolin', to: ['#issue-mcas', '#issue-calming', '#issue-cognitive', '#issue-nerve'] },
  { from: '#ing-lysine', to: ['#issue-collagen'] },
  { from: '#ing-magnesium', to: ['#issue-calming', '#issue-muscle', '#issue-autonomic', '#issue-cardiovascular'] },
  { from: '#ing-manganese', to: ['#issue-collagen', '#issue-antioxidant'] },
  { from: '#ing-folate', to: ['#issue-methylation', '#issue-nerve'] },
  { from: '#ing-molybdenum', to: ['#issue-mcas'] },
  { from: '#ing-niacinamide', to: ['#issue-energy', '#issue-mitochondria'] },
  { from: '#ing-nr', to: ['#issue-energy', '#issue-mitochondria', '#issue-mcas', '#issue-cardiovascular'] },
  { from: '#ing-p5p', to: ['#issue-energy', '#issue-nerve', '#issue-mcas', '#issue-methylation'] },
  { from: '#ing-pantothenic', to: ['#issue-energy', '#issue-mitochondria'] },
  { from: '#ing-pea', to: ['#issue-mcas', '#issue-calming', '#issue-cognitive', '#issue-nerve'] },
  { from: '#ing-pqq', to: ['#issue-energy', '#issue-mitochondria', '#issue-cognitive', '#issue-collagen'] },
  { from: '#ing-proline', to: ['#issue-collagen', '#issue-gut'] },
  { from: '#ing-pycnogenol', to: ['#issue-collagen', '#issue-cardiovascular', '#issue-antioxidant', '#issue-mcas', '#issue-cognitive'] },
  { from: '#ing-r5p', to: ['#issue-energy', '#issue-mitochondria'] },
  { from: '#ing-selenium', to: ['#issue-antioxidant', '#issue-immune'] },
  { from: '#ing-silicon', to: ['#issue-collagen'] },
  { from: '#ing-taurine', to: ['#issue-autonomic', '#issue-calming', '#issue-cardiovascular', '#issue-collagen', '#issue-muscle'] },
  { from: '#ing-theanine', to: ['#issue-calming', '#issue-cognitive', '#issue-mcas', '#issue-autonomic'] },
  { from: '#ing-b12', to: ['#issue-energy', '#issue-nerve', '#issue-methylation'] },
  { from: '#ing-vitc', to: ['#issue-collagen', '#issue-immune', '#issue-antioxidant', '#issue-mcas'] },
  { from: '#ing-carnitine', to: ['#issue-energy', '#issue-mitochondria', '#issue-cardiovascular', '#issue-muscle'] },
  { from: '#ing-zinc', to: ['#issue-gut', '#issue-immune', '#issue-collagen'] },
];

function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timeoutId: number | null = null;
  return ((...args: unknown[]) => {
    if (timeoutId !== null) { clearTimeout(timeoutId); }
    timeoutId = window.setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, ms);
  }) as T;
}

export default function InteractiveIngredientMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const activeElementRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const isMobileRef = useRef(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const originalIngredientOrderRef = useRef<HTMLElement[]>([]);
  const originalGoalOrderRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    const mapContainer = mapContainerRef.current;
    if (!svg || !mapContainer) return;

    isMobileRef.current = window.innerWidth < 768;
    const ingredientsCol = mapContainer.querySelector('#ingredients-col') as HTMLElement | null;
    const goalsCol = mapContainer.querySelector('#issues-col') as HTMLElement | null;
    if (!ingredientsCol || !goalsCol) return;

    originalIngredientOrderRef.current = Array.from(ingredientsCol.querySelectorAll('.item-card')) as HTMLElement[];
    originalGoalOrderRef.current = Array.from(goalsCol.querySelectorAll('.item-card')) as HTMLElement[];

    const drawLines = () => {
      svg.innerHTML = '';
      if (isMobileRef.current) return;
      const containerRect = mapContainer.getBoundingClientRect();

      CONNECTIONS.forEach(conn => {
        const ingredientEl = mapContainer.querySelector(conn.from) as HTMLElement | null;
        conn.to.forEach(goalId => {
          const goalEl = mapContainer.querySelector(goalId) as HTMLElement | null;
          if (goalEl && ingredientEl) {
            const goalRect = goalEl.getBoundingClientRect();
            const ingRect = ingredientEl.getBoundingClientRect();
            const startX = goalRect.right - containerRect.left;
            const startY = goalRect.top - containerRect.top + goalRect.height / 2;
            const endX = ingRect.left - containerRect.left;
            const endY = ingRect.top - containerRect.top + ingRect.height / 2;
            const goalColor = window.getComputedStyle(goalEl).borderLeftColor;
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const controlX1 = startX + (endX - startX) * 0.35;
            const controlX2 = startX + (endX - startX) * 0.65;
            const d = `M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`;
            path.setAttribute('d', d);
            path.setAttribute('stroke', goalColor);
            path.setAttribute('stroke-width', '1');
            path.setAttribute('fill', 'none');
            path.setAttribute('opacity', '0.3');
            path.dataset.ingredient = conn.from;
            path.dataset.goal = goalId;
            path.dataset.color = goalColor;
            svg.appendChild(path);
          }
        });
      });
    };

    const resetAll = () => {
      if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
      const highlightClasses = ['highlighted', 'unfocused', 'hover-highlighted', 'faded-below', 'connected-top'];
      mapContainer.querySelectorAll(highlightClasses.map(c => '.' + c).join(', ')).forEach(el => {
        el.classList.remove(...highlightClasses);
        const span = el.querySelector('.font-semibold') as HTMLElement | null;
        if (span) span.style.color = '';
      });
      if (originalIngredientOrderRef.current.length > 0) {
        originalIngredientOrderRef.current.forEach(el => ingredientsCol.appendChild(el));
      }
      if (originalGoalOrderRef.current.length > 0) {
        originalGoalOrderRef.current.forEach(el => goalsCol.appendChild(el));
      }
      if (!isMobileRef.current) {
        svg.querySelectorAll('path').forEach(p => {
          p.setAttribute('stroke-width', '1');
          p.setAttribute('opacity', '0.3');
          p.setAttribute('stroke', p.dataset.color || '');
        });
      }
    };

    const reorderItems = (column: HTMLElement, connectedItems: HTMLElement[], fadedItems: HTMLElement[], clickedIndex: number, sourceCount: number, targetCount: number) => {
      if (sourceCount === 0 || targetCount === 0 || connectedItems.length === 0) return;
      const targetPosition = Math.round((clickedIndex / sourceCount) * targetCount);
      const newOrder: (HTMLElement | undefined)[] = new Array(targetCount);
      const connectedCount = connectedItems.length;
      const connectedStart = Math.max(0, Math.min(targetPosition - Math.floor(connectedCount / 2), targetCount - connectedCount));
      connectedItems.forEach((el, i) => { newOrder[connectedStart + i] = el; });
      let fadedIdx = 0;
      for (let i = 0; i < targetCount && fadedIdx < fadedItems.length; i++) {
        if (!newOrder[i]) { newOrder[i] = fadedItems[fadedIdx++]; }
      }
      newOrder.forEach(el => { if (el) column.appendChild(el); });
    };

    const highlightConnection = (element: HTMLElement, shouldHighlight: boolean, isHover: boolean = false) => {
      if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
      resetAll();
      drawLines();
      if (!shouldHighlight) return;
      const elementId = '#' + element.id;
      const isGoal = element.closest('#issues-col') !== null;
      const connectedIngredientIds: string[] = [];
      const connectedGoalIds: string[] = [];
      if (isGoal) {
        CONNECTIONS.forEach(conn => { if (conn.to.includes(elementId)) { connectedIngredientIds.push(conn.from); } });
        connectedGoalIds.push(elementId);
      } else {
        const conn = CONNECTIONS.find(c => c.from === elementId);
        if (conn) { connectedGoalIds.push(...conn.to); }
        connectedIngredientIds.push(elementId);
      }
      const highlightClass = isHover ? 'hover-highlighted' : 'highlighted';
      element.classList.add(highlightClass);
      mapContainer.querySelectorAll('.item-card').forEach(card => {
        const cardId = '#' + card.id;
        const isIngredientCard = card.closest('#ingredients-col') !== null;
        if (isIngredientCard) {
          if (connectedIngredientIds.includes(cardId)) { card.classList.add(highlightClass, 'connected-top'); }
          else { card.classList.add(isGoal && !isHover ? 'faded-below' : 'unfocused'); }
        } else {
          if (connectedGoalIds.includes(cardId)) { card.classList.add(highlightClass, 'connected-top'); }
          else { card.classList.add(!isGoal && !isHover ? 'faded-below' : 'unfocused'); }
        }
      });
      if (!isHover) {
        const connected: HTMLElement[] = []; const faded: HTMLElement[] = [];
        if (isGoal) {
          ingredientsCol.querySelectorAll('.item-card').forEach(card => { (card.classList.contains('connected-top') ? connected : faded).push(card as HTMLElement); });
          const clickedIndex = originalGoalOrderRef.current.findIndex(el => el.id === element.id);
          reorderItems(ingredientsCol, connected, faded, clickedIndex, originalGoalOrderRef.current.length, originalIngredientOrderRef.current.length);
        } else {
          goalsCol.querySelectorAll('.item-card').forEach(card => { (card.classList.contains('highlighted') ? connected : faded).push(card as HTMLElement); });
          const clickedIndex = originalIngredientOrderRef.current.findIndex(el => el.id === element.id);
          reorderItems(goalsCol, connected, faded, clickedIndex, originalIngredientOrderRef.current.length, originalGoalOrderRef.current.length);
        }
        svg.querySelectorAll('path').forEach(p => p.setAttribute('opacity', '0'));
        timeoutRef.current = window.setTimeout(() => {
          drawLines();
          svg.querySelectorAll('path').forEach(path => {
            const matches = isGoal ? path.dataset.goal === elementId : path.dataset.ingredient === elementId;
            if (matches) { path.setAttribute('stroke-width', '3'); path.setAttribute('opacity', '1'); }
            else { path.setAttribute('opacity', '0'); }
          });
          if (isGoal) {
            const goalEl = mapContainer.querySelector(elementId) as HTMLElement | null;
            if (goalEl) {
              const goalColor = window.getComputedStyle(goalEl).borderLeftColor;
              connectedIngredientIds.forEach(ingId => {
                const span = mapContainer.querySelector(ingId)?.querySelector('.font-semibold') as HTMLElement | null;
                if (span) span.style.color = goalColor;
              });
            }
          } else {
            const conn = CONNECTIONS.find(c => c.from === elementId);
            if (conn && conn.to.length > 0) {
              const firstGoal = mapContainer.querySelector(conn.to[0]) as HTMLElement | null;
              if (firstGoal) {
                const goalColor = window.getComputedStyle(firstGoal).borderLeftColor;
                const ingredientEl = mapContainer.querySelector(elementId);
                const span = ingredientEl?.querySelector('.font-semibold') as HTMLElement | null;
                if (span) span.style.color = goalColor;
              }
            }
          }
        }, 100);
      } else {
        if (!isMobileRef.current) {
          svg.querySelectorAll('path').forEach(path => {
            const shouldShow = isGoal ? path.dataset.goal === elementId : path.dataset.ingredient === elementId;
            if (shouldShow) { path.setAttribute('stroke-width', '3'); path.setAttribute('opacity', '1'); path.setAttribute('stroke', path.dataset.color || ''); }
            else { path.setAttribute('stroke', '#d1d5db'); path.setAttribute('opacity', '0.2'); }
          });
        }
      }
    };

    const handleTap = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      if (activeElementRef.current === target) { highlightConnection(target, false, false); activeElementRef.current = null; }
      else { activeElementRef.current = target; highlightConnection(target, true, false); }
    };
    const handleMouseEnter = (e: Event) => { if (!activeElementRef.current) { highlightConnection(e.currentTarget as HTMLElement, true, true); } };
    const handleMouseLeave = (e: Event) => { if (!activeElementRef.current) { highlightConnection(e.currentTarget as HTMLElement, false, false); } };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTap(e); }
      else if (e.key === 'Escape' && activeElementRef.current) { highlightConnection(activeElementRef.current, false, false); activeElementRef.current = null; }
    };

    const cardHandlers = new Map<Element, { tap: EventListener; enter: EventListener; leave: EventListener; keydown: EventListener; }>();
    const addEventListeners = () => {
      mapContainer.querySelectorAll('.item-card').forEach(card => {
        const existing = cardHandlers.get(card);
        if (existing) { card.removeEventListener('click', existing.tap); card.removeEventListener('mouseenter', existing.enter); card.removeEventListener('mouseleave', existing.leave); card.removeEventListener('keydown', existing.keydown); }
        const handlers = { tap: handleTap as EventListener, enter: handleMouseEnter as EventListener, leave: handleMouseLeave as EventListener, keydown: handleKeyDown as EventListener };
        card.addEventListener('click', handlers.tap); card.addEventListener('keydown', handlers.keydown);
        if (!isMobileRef.current) { card.addEventListener('mouseenter', handlers.enter); card.addEventListener('mouseleave', handlers.leave); }
        cardHandlers.set(card, handlers);
      });
    };

    drawLines();
    addEventListeners();
    const handleResize = debounce(() => {
      const wasIsMobile = isMobileRef.current;
      isMobileRef.current = window.innerWidth < 768;
      if (wasIsMobile !== isMobileRef.current) {
        if (activeElementRef.current) { highlightConnection(activeElementRef.current, false, false); activeElementRef.current = null; }
        addEventListeners();
      }
      drawLines();
    }, 100);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mapContainer);
    return () => {
      if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
      cardHandlers.forEach((handlers, card) => { card.removeEventListener('click', handlers.tap); card.removeEventListener('mouseenter', handlers.enter); card.removeEventListener('mouseleave', handlers.leave); card.removeEventListener('keydown', handlers.keydown); });
      cardHandlers.clear(); resizeObserver.disconnect();
    };
  }, []);

  return (
    <section 
      className="py-4 md:py-10 px-2 sm:px-4 md:px-8 bg-[#DED9D0]"
    >
      <style>{`
        .item-card { transition: all 0.15s ease-in-out; cursor: pointer; }
        .item-card:focus { outline: 2px solid #3b82f6; outline-offset: 2px; }
        .item-card:focus:not(:focus-visible) { outline: none; }
        .item-card:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
        .item-card .font-semibold { transition: color 0.15s ease-in-out; }
        .item-card.highlighted { transform: scale(1.03); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); z-index: 10; position: relative; opacity: 1 !important; }
        .item-card.hover-highlighted { transform: scale(1.02); box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.08); z-index: 5; position: relative; opacity: 1 !important; }
        .item-card.unfocused { opacity: 0.4; transform: scale(0.98); }
        .item-card.faded-below { opacity: 0.5; }
        svg path { transition: stroke-width 0.15s ease, opacity 0.15s ease, stroke 0.15s ease; pointer-events: none; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-forest">ZEBRAWELL</h2>
          <h3 className="mt-2 text-lg sm:text-xl md:text-2xl font-semibold text-sky-600">Ingredient-to-Benefit Map</h3>
          <p className="mt-3 text-sm md:text-base text-forest/80 max-w-3xl mx-auto">
            Click or tap on an ingredient or health goal to see its specific connections. Click another to switch focus. Press Escape to clear selection.
          </p>
        </div>

        <div id="map-container" ref={mapContainerRef} className="relative w-full" role="application">
          <div className="flex flex-row justify-between items-start gap-4 md:gap-16">

            {/* Column 1: Health Goals */}
            <div id="issues-col" className="w-[39%] md:w-[31%] space-y-2 md:space-y-6" role="list">
              <h3 className="text-base md:text-lg font-bold text-forest text-center md:text-left mb-2 md:mb-3">TARGETED HEALTH GOALS</h3>
              <div id="issue-mitochondria" className="item-card bg-white px-2 py-2 md:px-3 md:py-3 rounded-lg shadow-sm border-l-4 border-yellow-400 font-semibold text-forest text-xs md:text-base flex items-center" role="listitem" tabIndex={0}>Mitochondrial Health</div>
              <div id="issue-energy" className="item-card bg-white px-2 py-2 md:px-3 md:py-3 rounded-lg shadow-sm border-l-4 border-red-500 font-semibold text-forest text-xs md:text-base flex items-center" role="listitem" tabIndex={0}>Fatigue & Energy Production</div>
              <div id="issue-cognitive" className="item-card bg-white px-2 py-2 md:px-3 md:py-3 rounded-lg shadow-sm border-l-4 border-indigo-400 font-semibold text-forest text-xs md:text-base flex items-center" role="listitem" tabIndex={0}>Cognitive Function & Brain Fog</div>
              <div id="issue-nerve" className="item-card bg-white px-2 py-2 md:px-3 md:py-3 rounded-lg shadow-sm border-l-4 border-lime-500 font-semibold text-forest text-xs md:text-base flex items-center" role="listitem" tabIndex={0}>Nerve Health</div>
              <div id="issue-autonomic" className="item-card bg-white px-3 py-2 md:px-3 md:py-3 rounded-lg shadow-sm border-l-4 border-cyan-500 font-semibold text-forest text-xs md:text-base flex items-center" role="listitem" tabIndex={0}>Autonomic Regulation (POTS)</div>
              <div id="issue-calming" className="item-card bg-white px-2 py-2 md:px-3 md:py-3 rounded-lg shadow-sm border-l-4 border-violet-400 font-semibold text-forest text-xs md:text-base flex items-center" role="listitem" tabIndex={0}>Neuro-Calming</div>
              <div id="issue-methylation" className="item-card bg-white px-2 py-2 md:px-3 md:py-3 rounded-lg shadow-sm border-l-4 border-emerald-400 font-semibold text-forest text-xs md:text-base flex items-center" role="listitem" tabIndex={0}>Methylation</div>
              <div id="issue-cardiovascular" className="item-card bg-white px-2 py-2 md:px-3 md:py-3 rounded-lg shadow-sm border-l-4 border-rose-500 font-semibold text-forest text-xs md:text-base flex items-center" role="listitem" tabIndex={0}>Cardiovascular</div>
              <div id="issue-muscle" className="item-card bg-white px-2 py-2 md:px-3 md:py-3 rounded-lg shadow-sm border-l-4 border-blue-400 font-semibold text-forest text-xs md:text-base flex items-center" role="listitem" tabIndex={0}>Muscle</div>
              <div id="issue-collagen" className="item-card bg-white px-2 py-2 md:px-3 md:py-3 rounded-lg shadow-sm border-l-4 border-amber-500 font-semibold text-forest text-xs md:text-base flex items-center" role="listitem" tabIndex={0}>Collagen/Tissue</div>
              <div id="issue-mcas" className="item-card bg-white px-2 py-2 md:px-3 md:py-3 rounded-lg shadow-sm border-l-4 border-purple-500 font-semibold text-forest text-xs md:text-base flex items-center" role="listitem" tabIndex={0}>Mast Cell</div>
              <div id="issue-antioxidant" className="item-card bg-white px-2 py-2 md:px-3 md:py-3 rounded-lg shadow-sm border-l-4 border-green-500 font-semibold text-forest text-xs md:text-base flex items-center" role="listitem" tabIndex={0}>Antioxidant</div>
              <div id="issue-immune" className="item-card bg-white px-2 py-2 md:px-3 md:py-3 rounded-lg shadow-sm border-l-4 border-teal-500 font-semibold text-forest text-xs md:text-base flex items-center" role="listitem" tabIndex={0}>Immune Balance</div>
              <div id="issue-gut" className="item-card bg-white px-2 py-2 md:px-3 md:py-3 rounded-lg shadow-sm border-l-4 border-orange-400 font-semibold text-forest text-xs md:text-base flex items-center" role="listitem" tabIndex={0}>Gut Health</div>
            </div>

            {/* Column 2: Ingredients */}
            <div id="ingredients-col" className="w-[39%] md:w-[31%] space-y-1 md:space-y-2" role="list">
              <h3 className="text-base md:text-lg font-bold text-forest text-center md:text-left mb-2 md:mb-3">FORMULATION INGREDIENTS</h3>
              <div id="ing-astaxanthin" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Astaxanthin</span></div>
              <div id="ing-benfotiamine" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Benfotiamine (B1)</span></div>
              <div id="ing-biotin" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Biotin (B7)</span></div>
              <div id="ing-boron" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Boron</span></div>
              <div id="ing-cga" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Chlorogenic Acid</span></div>
              <div id="ing-coq10" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">CoQ10 (Ubiquinol)</span></div>
              <div id="ing-copper" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Copper</span></div>
              <div id="ing-emiq" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">EMIQ (Enzymatic Quercetin)</span></div>
              <div id="ing-folate" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Folate (L-5-MTHF)</span></div>
              <div id="ing-carnitine" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">L-Carnitine Fumarate</span></div>
              <div id="ing-lysine" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">L-Lysine HCl</span></div>
              <div id="ing-proline" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">L-Proline</span></div>
              <div id="ing-theanine" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">L-Theanine</span></div>
              <div id="ing-luteolin" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Luteolin</span></div>
              <div id="ing-magnesium" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Magnesium Glycinate</span></div>
              <div id="ing-manganese" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Manganese</span></div>
              <div id="ing-molybdenum" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Molybdenum</span></div>
              <div id="ing-niacinamide" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Niacinamide (B3)</span></div>
              <div id="ing-nr" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Nicotinamide Riboside (NR)</span></div>
              <div id="ing-pea" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Palmitoylethanolamide (PEA)</span></div>
              <div id="ing-pantothenic" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Pantothenic Acid (B5)</span></div>
              <div id="ing-pqq" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">PQQ</span></div>
              <div id="ing-pycnogenol" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Pycnogenol®</span></div>
              <div id="ing-lactoferrin" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Recombinant Human Lactoferrin</span></div>
              <div id="ing-r5p" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Riboflavin (B2)</span></div>
              <div id="ing-selenium" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Selenium</span></div>
              <div id="ing-silicon" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Silicon</span></div>
              <div id="ing-taurine" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Taurine</span></div>
              <div id="ing-b12" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Vitamin B12</span></div>
              <div id="ing-p5p" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Vitamin B6 (P5P)</span></div>
              <div id="ing-vitc" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Vitamin C</span></div>
              <div id="ing-d3" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Vitamin D3</span></div>
              <div id="ing-k2" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Vitamin K2</span></div>
              <div id="ing-zinc" className="item-card bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm text-xs md:text-base" role="listitem" tabIndex={0}><span className="font-semibold text-forest">Zinc Carnosine</span></div>
            </div>
          </div>
          <svg ref={svgRef} id="connector-svg" className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}