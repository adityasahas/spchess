import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Divider,
  Chip,
  Badge,
  Spinner,
  Link,
  Spacer
} from "@nextui-org/react";
import { BsBook } from "react-icons/bs";
import { GiPodium } from "react-icons/gi";
const officers = [
  {
    name: "Aayush Raiyani",
    role: "President",
    chesscom: "ArRahane90",
    lichess: "ArRahane90",
  },
  {
    name: "Aditya Sahasranam",
    role: "Vice President",
    chesscom: "bababooeyacc",
    lichess: "bababooeyacc",
  },
  {
    name: "Dylan Gambino",
    role: "Treasurer",
    chesscom: "dillpicklehaha",
  },
  {
    name: "Tristan Krizen",
    role: "Secretary",
    chesscom: "TristanDaBomb",
  },
];
const getInitials = (name: string) => {
  const names = name.split(" ");
  return `${names[0][0]}${names[1][0]}`;
};
interface Officer {
  name: string;
  role: string;
  rating: number;
  description: string;
  chesscom: string;
  lichess?: string;
  url?: string;
}

interface ChessStats {
  last: {
    rating: number;
  };
  online?: boolean;
  url?: string;
}
const AboutUs: React.FC = () => {
  const [chessData, setChessData] = useState<Record<string, ChessStats>>({});

  useEffect(() => {
    const fetchChessData = async () => {
      const newChessData: Record<string, ChessStats> = {};
      for (const officer of officers) {
        const response = await fetch(
          `https://api.chess.com/pub/player/${officer.chesscom}/stats`
        );
        const stats = await response.json();

       

        const playerURL = await fetch(
          `https://api.chess.com/pub/player/${officer.chesscom}`
        );
        const playerData = await playerURL.json();
        newChessData[officer.chesscom] = {
          last: stats.chess_rapid?.last || { rating: "N/A" },
          url: playerData.url,
        };
      }
      setChessData(newChessData);
    };

    fetchChessData();
  }, []);
  return (
    <div className="p-4 md:p-12">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 text-center">About Us</h1>
      <div className="flex flex-col md:flex-row justify-center">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 mb-12">
          {officers.map((officer, index) => (
              <Card
              key={index}
              className="max-w-[540px] p-4 rounded-lg shadow-lg"
            >
              <CardHeader className="flex ">
                <Avatar
                  showFallback
                  name={getInitials(officer.name)}
                  isBordered
                  radius="full"
                  size="md"
                />
                <div className="flex flex-col gap-2 items-start ml-5">
                  <div className="flex items-center ">
                    <h4 className="text-lg font-semibold">{officer.name}</h4>

                    <Chip color="success" variant="shadow" className="ml-2">
                      {chessData[officer.chesscom]?.last.rating !==
                      undefined ? (
                        chessData[officer.chesscom]?.last.rating
                      ) : (
                        <Spinner size="sm" color="white" className="p-4" />
                      )}
                    </Chip>
                  </div>
                  <h5 className="text-sm text-gray-500">{officer.role}</h5>
                </div>
              </CardHeader>
              <Divider />

              <CardFooter className="flex flex-col items-start">
                {officer.chesscom && (
                  <Chip color="success" variant="shadow" className="mb-2">
                    chess username: {officer.chesscom}
                  </Chip>
                )}
                <Spacer y={4} />
                {chessData[officer.chesscom]?.url && (
                  <Link
                    href={chessData[officer.chesscom]?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    profile
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="p-4 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-12 text-center">Stuff We Do</h2>
        <div className="flex flex-col md:flex-row justify-center">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 items-center">
         <Card className="p-4 rounded-lg shadow-lg w-full">
              <CardHeader className="flex items-center">
                <BsBook size="1.5em" className="mr-2" />
                <h4 className="text-lg font-semibold">Lessons</h4>
              </CardHeader>
              <CardBody className="text-base">
                <p>
                  We offer chess lessons every week. Whether you're a beginner
                  or an intermediate player, our lessons are tailored to help
                  you improve your skills.
                </p>
              </CardBody>
            </Card>

            <Card className="p-4 rounded-lg shadow-lg w-full">
              <CardHeader className="flex items-center">
                <GiPodium size="1.5em" className="mr-2" />
                <h4 className="text-lg font-semibold">Tournaments</h4>
              </CardHeader>
              <CardBody className="text-base">
                <p>
                  We host monthly championships where you can compete against
                  other club members. These tournaments offer a great way to
                  apply what you've learned and gain real-world experience.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
