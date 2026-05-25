"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: any;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-orange-600 bg-white border-white font-bold";
      case "in-progress":
        return "text-white bg-blue-500 border-blue-400";
      case "pending":
        return "text-white bg-white/20 border-white/30";
      default:
        return "text-white bg-white/20 border-white/30";
    }
  };

  return (
    <div
      className="w-full min-h-[600px] flex flex-col items-center justify-center bg-transparent"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1200px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Central Core - High Intensity for Orange Background */}
          <div className="absolute w-16 h-16 rounded-full bg-white animate-orbital-pulse flex items-center justify-center z-10 shadow-[0_0_60px_rgba(255,255,255,0.6)]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-cyan-200 to-blue-300 opacity-80" />
            <div className="absolute w-24 h-24 rounded-full border-2 border-white/50 animate-orbital-ping opacity-60"></div>
            <div
              className="absolute w-32 h-32 rounded-full border border-white/20 animate-orbital-ping opacity-30"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-white z-20 shadow-xl border border-blue-100"></div>
          </div>

          {/* Orbital Ring - More Visible */}
          <div className="absolute w-[400px] h-[400px] rounded-full border border-white/25 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Glow Aura */}
                <div
                  className={`absolute rounded-full -inset-4 ${
                    isPulsing ? "animate-orbital-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 60}px`,
                    height: `${item.energy * 0.5 + 60}px`,
                    left: `-${(item.energy * 0.5 + 60 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 60 - 40) / 2}px`,
                  }}
                ></div>

                {/* Node Circle */}
                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-white text-orange-600 shadow-[0_0_30px_rgba(255,255,255,0.8)]"
                      : isRelated
                      ? "bg-white/80 text-orange-600"
                      : "bg-white/10 text-white backdrop-blur-md"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-white"
                      : isRelated
                      ? "border-white animate-orbital-pulse"
                      : "border-white/40"
                  }
                  transition-all duration-300 transform hover:scale-110
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={20} />
                </div>

                <div
                  className={`
                  absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-[10px] font-bold tracking-[0.2em] uppercase
                  transition-all duration-300
                  ${isExpanded ? "text-white scale-110" : "text-white/60"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-24 left-1/2 -translate-x-1/2 w-72 bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-black/20 overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50"></div>
                    {/* Mac-style Window Header for Consistency */}
                    <div className="flex items-center gap-1.5 px-4 pt-3 pb-1 border-b border-white/10">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <CardHeader className="pb-2 pt-4">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 py-0.5 text-[10px] rounded-sm ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </Badge>
                        <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-lg mt-2 text-white font-bold">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/90 leading-relaxed">
                      <p className="mb-4">{item.content}</p>

                      <div className="pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-[10px] mb-1.5 uppercase tracking-tighter">
                          <span className="flex items-center font-medium">
                            <Zap size={10} className="mr-1 text-cyan-300" />
                            Intensity Level
                          </span>
                          <span className="font-mono text-cyan-300">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/70 mr-1" />
                            <h4 className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/50">
                              Linked Domains
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-7 px-3 py-0 text-[10px] rounded-full border-white/20 bg-white/5 hover:bg-white/20 text-white transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 opacity-50"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
