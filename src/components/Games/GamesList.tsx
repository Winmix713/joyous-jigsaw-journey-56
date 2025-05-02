
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import GameCard from "@/components/betting/GameCard";
import { Game } from "@/lib/types";
import { Info } from "lucide-react";

interface GamesListProps {
  category?: string;
}

const GamesList = ({ category = "all" }: GamesListProps) => {
  const { games } = useAppStore();
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  
  useEffect(() => {
    if (category === "all") {
      setFilteredGames(games);
    } else if (category === "live") {
      setFilteredGames(games.filter(game => game.status === "live"));
    } else if (category === "upcoming") {
      setFilteredGames(games.filter(game => game.status === "upcoming"));
    } else {
      setFilteredGames(games.filter(game => game.category === category));
    }
  }, [games, category]);

  if (filteredGames.length === 0) {
    return (
      <div className="once-card flex flex-col items-center justify-center min-h-[300px] p-8">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Info className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-xl text-muted-foreground">No games found in this category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GamesList;
