import React, { useEffect, useState } from "react";
import { Card } from "@nextui-org/react";
import { fetchGames } from "../utils/fetchGames";
import { GetServerSideProps } from "next";
type Game = {
  whiteName: string;
  blackName: string;
  whiteEmail: string;
  blackEmail: string;
  pgn: string;
  date: string;
  gameType: string;
};

type Props = {
  games: Game[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const fetchedGames = await fetchGames();
    const games = fetchedGames.map(({ _id, ...rest }) => rest) as unknown as Game[]; // Explicitly cast to Game[]
    return { props: { games } };
  };
  
  
  
const GamesPage: React.FC<Props> = ({ games }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {games.map((game, index) => (
        <Card key={index} className="m-4" style={{ width: "300px" }}>
          <h3>
            {game.whiteName} vs {game.blackName}
          </h3>{" "}
         
          <p>Date: {game.date}</p> 
          <p>Type: {game.gameType}</p> 
        </Card>
      ))}
    </div>
  );
};

export default GamesPage;
