
import { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

// Premier League csapatok adatai
const TEAMS = [
  { id: "arsenal", name: "London Ágyúk", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "astonvilla", name: "Aston Oroszlán", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "bournemouth", name: "Bournemouth", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "brentford", name: "Brentford", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "brighton", name: "Brighton", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "chelsea", name: "Chelsea Kékek", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "crystalpalace", name: "Kristály Palota", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "everton", name: "Everton", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "fulham", name: "Fulham", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "liverpool", name: "Liverpool", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "mancity", name: "Manchester Kék", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "manutd", name: "Vörös Ördögök", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "newcastle", name: "Newcastle", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "nottingham", name: "Nottingham", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "tottenham", name: "Tottenham", logoUrl: "/api/placeholder/50/50", league: "premier-league" },
  { id: "westham", name: "West Ham", logoUrl: "/api/placeholder/50/50", league: "premier-league" }
];

// Tabella adatok
const TABLE_DATA = [
  { id: "mancity", name: "Manchester Kék", played: 5, wins: 5, draws: 0, losses: 0, goalDiff: 12, points: 15, highlight: false },
  { id: "liverpool", name: "Liverpool", played: 5, wins: 4, draws: 1, losses: 0, goalDiff: 9, points: 13, highlight: false },
  { id: "brighton", name: "Brighton", played: 5, wins: 4, draws: 0, losses: 1, goalDiff: 7, points: 12, highlight: true },
  { id: "tottenham", name: "Tottenham", played: 5, wins: 3, draws: 2, losses: 0, goalDiff: 7, points: 11, highlight: false },
  { id: "arsenal", name: "London Ágyúk", played: 5, wins: 3, draws: 2, losses: 0, goalDiff: 5, points: 11, highlight: false },
  { id: "astonvilla", name: "Aston Oroszlán", played: 5, wins: 3, draws: 0, losses: 2, goalDiff: 2, points: 9, highlight: true },
  { id: "westham", name: "West Ham", played: 5, wins: 2, draws: 1, losses: 2, goalDiff: -1, points: 7, highlight: false },
  { id: "newcastle", name: "Newcastle", played: 5, wins: 2, draws: 1, losses: 2, goalDiff: 3, points: 7, highlight: false },
  { id: "crystalpalace", name: "Kristály Palota", played: 5, wins: 2, draws: 1, losses: 2, goalDiff: -2, points: 7, highlight: false },
  { id: "fulham", name: "Fulham", played: 5, wins: 2, draws: 1, losses: 2, goalDiff: -5, points: 7, highlight: false },
  { id: "manutd", name: "Vörös Ördögök", played: 5, wins: 2, draws: 0, losses: 3, goalDiff: -2, points: 6, highlight: false, grey: true },
  { id: "brentford", name: "Brentford", played: 5, wins: 1, draws: 3, losses: 1, goalDiff: 2, points: 6, highlight: false },
  { id: "nottingham", name: "Nottingham", played: 5, wins: 1, draws: 2, losses: 2, goalDiff: -2, points: 5, highlight: false },
  { id: "chelsea", name: "Chelsea Kékek", played: 5, wins: 1, draws: 2, losses: 2, goalDiff: -1, points: 5, highlight: false },
  { id: "bournemouth", name: "Bournemouth", played: 5, wins: 0, draws: 3, losses: 2, goalDiff: -4, points: 3, highlight: false },
  { id: "everton", name: "Everton", played: 5, wins: 0, draws: 1, losses: 4, goalDiff: -7, points: 1, highlight: false },
];

export default function LeagueStandings() {
  const [isCompact, setIsCompact] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Tabella rendezése pontok (csökkenő), gólkülönbség (csökkenő) és csapatnév (növekvő) szerint
  const sortedTableData = [...TABLE_DATA].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
    return a.name.localeCompare(b.name);
  });

  useEffect(() => {
    // Tabella láthatóvá tétele betöltés után
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  }, []);

  // Kompakt nézet váltása
  const toggleCompactView = () => {
    setIsCompact(!isCompact);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 items-end relative z-10">
      <button
        onClick={toggleCompactView}
        className="premier-button"
        aria-label={isCompact ? 'Teljes táblázat mutatása' : 'Kompakt nézet bekapcsolása'}
      >
        {isCompact ? 'Teljes Táblázat' : 'Kompakt Nézet'}
      </button>

      <div 
        className={cn(
          "glass-effect w-full transition-all duration-700",
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          isCompact ? 'scale-90' : ''
        )}
      >
        <div className="flex justify-between items-center p-6 border-b border-white/20 bg-gradient-to-r from-premier-purple/20 to-premier-blue/20">
          <div className="flex flex-col items-center p-4">
            <div className="w-28 h-28 flex items-center justify-center">
              <img
                src="/api/placeholder/200/100"
                alt="Premier League Logo"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="mt-2 text-center">
              <span className="premier-gradient-text text-lg">Premier League</span>
            </div>
          </div>
          
          <div className="w-16 h-16 bg-premier-blue rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="text-white font-bold text-2xl">
              FP
            </div>
          </div>
        </div>

        <div className="bg-black text-white flex items-center font-bold text-sm sticky top-0 z-10">
          <div className="w-12 p-3 text-center">#</div>
          <div className="flex-1 p-3">ÁLLÁS</div>
          <div className="w-16 p-3 text-center text-premier-blue">MÉ</div>
          <div className="w-16 p-3 text-center text-premier-blue">GY</div>
          <div className="w-16 p-3 text-center text-premier-blue">D</div>
          <div className="w-16 p-3 text-center text-premier-blue">V</div>
          <div className="w-16 p-3 text-center text-premier-blue">GK</div>
          <div className="w-16 p-3 text-center text-premier-blue">P</div>
        </div>

        <div className={`overflow-y-auto ${isCompact ? 'max-h-64' : 'max-h-96'}`}>
          {sortedTableData.map((team, index) => {
            const position = index + 1;
            const teamInfo = TEAMS.find(t => t.id === team.id);
            
            // Sor stílus meghatározása
            let rowClass = "flex items-center w-full border-b border-white/10 text-sm p-3";
            let bgClass = "bg-white bg-opacity-5 hover:bg-opacity-10";
            
            if (team.highlight) {
              bgClass = "bg-primary/20 hover:bg-primary/30";
            } else if (team.grey) {
              bgClass = "bg-gray-500/20 hover:bg-gray-400/30";
            }
            
            return (
              <div 
                key={team.id} 
                className={cn(
                  rowClass, 
                  bgClass, 
                  "transition-all duration-300"
                )}
                data-team-id={team.id}
              >
                <div className="w-12 text-center text-lg font-bold">
                  {position}
                </div>
                <div className="flex-1 flex items-center gap-4 pl-2">
                  <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={teamInfo?.logoUrl || "/api/placeholder/50/50"}
                      alt={`${team.name} logo`}
                      className="h-full w-full object-contain hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-semibold tracking-wide">
                    {team.name.toUpperCase()}
                  </span>
                </div>
                <div className="w-16 text-center">{team.played}</div>
                <div className="w-16 text-center">{team.wins}</div>
                <div className="w-16 text-center">{team.draws}</div>
                <div className="w-16 text-center">{team.losses}</div>
                <div className="w-16 text-center">{team.goalDiff > 0 ? '+' : ''}{team.goalDiff}</div>
                <div className="w-16 text-center font-bold text-base">
                  {team.points}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-premier-purple opacity-10 absolute bottom-4 right-4 z-0">
          <Trophy size={80} strokeWidth={1} className="rotate-12" />
        </div>
      </div>
    </div>
  );
}
