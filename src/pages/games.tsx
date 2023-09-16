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
  Popover,
  PopoverTrigger,
  PopoverContent,
  Code
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
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [fetchedUsers, setFetchedUsers] = useState<Set<string>>(new Set()); // New state for caching
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentPgn, setCurrentPgn] = useState("");

  const fetchPlayerData = async (whiteUser: string, blackUser: string) => {
    // Check if we've already fetched this data
    if (fetchedUsers.has(whiteUser) && fetchedUsers.has(blackUser)) {
      return;
    }

    setLoadingStates((prev) => ({
      ...prev,
      [whiteUser]: true,
      [blackUser]: true,
    }));

    const [whiteResponse, blackResponse] = await Promise.all([
      fetch(`https://api.chess.com/pub/player/${whiteUser}`),
      fetch(`https://api.chess.com/pub/player/${blackUser}`),
    ]);

    const [whiteData, blackData] = await Promise.all([
      whiteResponse.json(),
      blackResponse.json(),
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

    setLoadingStates((prev) => ({
      ...prev,
      [whiteUser]: false,
      [blackUser]: false,
    }));

    setFetchedUsers(
      (prevUsers) => new Set([...prevUsers, whiteUser, blackUser])
    ); // Add to cache
  };

  useEffect(() => {
    games.forEach((game) => {
      fetchPlayerData(game.whiteUser, game.blackUser);
    });
  }, [games]);

  const sortedGames = [...games].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  return (
    <div className="flex flex-wrap justify-center overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedGames.map((game, index) => (
          <Card key={index} className="mx-4 w-auto sm:w-auto ">
            <div className="flex flex-col justify-between h-full">
              {" "}
              {loadingStates[game.whiteUser] ||
              loadingStates[game.blackUser] ? (
                <Spinner label="Loading..." color="danger" size="lg" />
              ) : (
                <>
                  <CardHeader className="justify-between">
                    <div className="flex gap-5">
                      <div className="flex flex-col items-center gap-2">
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
                      <span className="self-center">vs</span>
                      <div className="flex items-center gap-2 flex-col">
                        <User
                          name={game.blackName}
                          description={
                            game.gameType === "chess.com" ? (
                              <Link
                                size="sm"
                                isExternal
                                href={profileURLs[game.blackUser]}
                              >
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
  <p>Platform: {game.gameType === 'otb' ? 'over the board' : game.gameType}</p>
</CardBody>

                  <CardFooter className="justify-between">
                    <Code>{game.date}</Code>
                    <Button
                      onClick={() => {
                        setCurrentPgn(game.pgn);
                        onOpen();
                      }}
                      variant="light"
                      color="success"
                    >
                      View Game PGN
                    </Button>
                  </CardFooter>
                </>
              )}
            </div>
          </Card>
        ))}
        <Modal
          backdrop="blur"
          size="5xl"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
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
                  <Popover placement="left">
                    <PopoverTrigger>
                      <Button
                        onClick={() => copyToClipboard(currentPgn)}
                        variant="light"
                        color="primary"
                      >
                        Copy PGN
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>Copied to clipboard!</PopoverContent>
                  </Popover>
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
