import React, { useEffect, useState } from "react";
import {
  Chip,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  User,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Link,
  useDisclosure,
  AvatarIcon,
  Spinner,
} from "@nextui-org/react";
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
  whiteUser: string;
  blackUser: string;
  winner: string;
};

type Props = {
  games: Game[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const fetchedGames = await fetchGames();
  const games = fetchedGames.map(({ _id, ...rest }) => ({
    ...rest,
    _id: _id.toString(),
  })) as unknown as Game[];
  return { props: { games } };
};

const GamesPage: React.FC<Props> = ({ games }) => {
  const [avatars, setAvatars] = useState<{ [key: string]: string }>({});
  const [profileURLs, setProfileURLs] = useState<{ [key: string]: string }>({});
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [fetchedUsers, setFetchedUsers] = useState<Set<string>>(new Set()); // New state for caching
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentPgn, setCurrentPgn] = useState("");

  const fetchPlayerData = async (whiteUser: string, blackUser: string) => {
    // Check if we've already fetched this data
    if (fetchedUsers.has(whiteUser) && fetchedUsers.has(blackUser)) {
      return;
    }
    
    setLoadingStates((prev) => ({ ...prev, [whiteUser]: true, [blackUser]: true }));
    
    const [whiteResponse, blackResponse] = await Promise.all([
      fetch(`https://api.chess.com/pub/player/${whiteUser}`),
      fetch(`https://api.chess.com/pub/player/${blackUser}`)
    ]);

    const [whiteData, blackData] = await Promise.all([
      whiteResponse.json(),
      blackResponse.json()
    ]);

    setAvatars((prevAvatars) => ({
      ...prevAvatars,
      [whiteUser]: whiteData.avatar,
      [blackUser]: blackData.avatar,
    }));

    setProfileURLs((prevProfileURLs) => ({
      ...prevProfileURLs,
      [whiteUser]: whiteData.url,
      [blackUser]: blackData.url,
    }));

    setLoadingStates((prev) => ({ ...prev, [whiteUser]: false, [blackUser]: false }));
    
    setFetchedUsers((prevUsers) => new Set([...prevUsers, whiteUser, blackUser])); // Add to cache
  };

  useEffect(() => {
    games.forEach((game) => {
      fetchPlayerData(game.whiteUser, game.blackUser);
    });
  }, [games]);

  const sortedGames = [...games].sort((a, b) => {
    const dateA = a.date.split("/").reverse().join("");
    const dateB = b.date.split("/").reverse().join("");
    return dateB.localeCompare(dateA);
  });

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-4">
        {sortedGames.map((game, index) => (
          <Card key={index} className="m-4" style={{ width: "420px" }}>
            {loadingStates[game.whiteUser] || loadingStates[game.blackUser] ? (
              <Spinner label="Loading..." color="danger" size="lg" />
            ) : (
              <>
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <div className="flex items-center gap-2">
                      <User
                        name={game.whiteName}
                        description={
                          game.gameType === "chess.com" ? (
                            <Link
                              size="sm"
                              isExternal
                              href={profileURLs[game.whiteUser]}
                            >
                              Profile
                            </Link>
                          ) : null
                        }
                        avatarProps={{
                          src: avatars[game.whiteUser] || "/user.png",
                        }}
                      />
                      {game.winner === "white" ? (
                        <Chip variant="shadow" color="success">
                          Winner
                        </Chip>
                      ) : game.winner === "black" ? (
                        <Chip color="danger">Loser</Chip>
                      ) : (
                        <Chip color="warning">N/A</Chip>
                      )}
                    </div>
                    <span className="self-center">VS</span>
                    <div className="flex items-center gap-2">
                      <User
                        name={game.blackName}
                        description={
                          game.gameType === "chess.com" ? (
                            <Link href={profileURLs[game.blackUser]}>
                              Profile
                            </Link>
                          ) : null
                        }
                        avatarProps={{
                          src: avatars[game.blackUser] || "/user.png",
                        }}
                      />
                      {game.winner === "black" ? (
                        <Chip variant="shadow" color="success">
                          Winner
                        </Chip>
                      ) : game.winner === "white" ? (
                        <Chip color="danger">Loser</Chip>
                      ) : (
                        <Chip color="warning">N/A</Chip>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardBody>
                  <p>Platform: {game.gameType}</p>
                </CardBody>
                <CardFooter className="justify-between">
                  <p>{game.date}</p>
                  <Button
                    onClick={() => {
                      setCurrentPgn(game.pgn);
                      onOpen();
                    }}
                    variant="light"
                    color="success"
                  >
                    View Game
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        ))}
        <Modal
          backdrop="blur"
          size="5xl"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  PGN Data
                </ModalHeader>
                <ModalBody>
                  <pre>{currentPgn}</pre>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default GamesPage;
