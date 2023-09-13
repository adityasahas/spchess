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
}

interface ChessStats {
  last: {
    rating: number;
  };
  online?: boolean;
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

        const onlineResponse = await fetch(
          `https://api.chess.com/pub/player/${officer.chesscom}/is-online`
        );
        const onlineStatus = await onlineResponse.json();

        newChessData[officer.chesscom] = {
          last: stats.chess_rapid?.last || { rating: "N/A" },
          online: onlineStatus.online,
        };
      }
      setChessData(newChessData);
    };

    fetchChessData();
  }, []);
  return (
    <div className=" p-12">
      <h1 className="text-4xl font-bold mb-12 text-center">About Us</h1>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 mb-12">
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
                      {chessData[officer.chesscom]?.last.rating || "N/A"}
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
                {officer.lichess && (
                  <Chip color="warning" variant="shadow">
                    lichess username: {officer.lichess}
                  </Chip>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="p-12">
        <h2 className="text-3xl font-bold mb-12 text-center">Stuff We Do</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 items-center">
            <Card className="p-4 rounded-lg shadow-lg w-full">
                 <CardHeader className="flex items-center">
              <BsBook size="1.5em" className="mr-2" />
              <h4 className="text-lg font-semibold">Lessons</h4>
            </CardHeader>
            <CardBody className="text-base">
              <p>
                We offer chess lessons every week. Whether you're a beginner or an intermediate
                player, our lessons are tailored to help you improve your
                skills.
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
                other club members. These tournaments offer a great way to apply
                what you've learned and gain real-world experience.
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
