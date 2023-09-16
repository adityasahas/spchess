import React, { useState, useEffect } from "react";
import {
  useDisclosure,
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox,
  Snippet,
} from "@nextui-org/react";
import { BiLogoGmail } from "react-icons/bi";

const Log: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [whiteName, setWhiteName] = useState("");
  const [whiteEmail, setWhiteEmail] = useState("");
  const [blackName, setBlackName] = useState("");
  const [blackEmail, setBlackEmail] = useState("");
  const [pgn, setPgn] = useState("");
  const [date, setDate] = useState("");
  const [gameType, setGameType] = useState("");
  const [whiteUser, setWhiteUser] = useState("");
  const [blackUser, setBlackUser] = useState("");
  const [winner, setWinner] = useState<"white" | "black" | null>(null);
  const [isValid, setIsValid] = useState(false);

  const handleOpenModal = () => {
    onOpen();
  };
  const handleSubmit = async () => {
    if (!isValid) {
      return;
    }
    const fullWhiteEmail = `${whiteEmail}@hjuhsd.k12.ca.us`;
    const fullBlackEmail = `${blackEmail}@hjuhsd.k12.ca.us`;
    const response = await fetch("/api/submitGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        whiteName,
        whiteEmail: fullWhiteEmail,
        blackName,
        blackEmail: fullBlackEmail,
        pgn,
        date,
        gameType,
        whiteUser,
        blackUser,
        winner,
      }),
    });

    if (response.ok) {
      onClose();
    } else {
    }
  };
  const checkValid = () => {
    if (
      whiteName &&
      whiteEmail &&
      blackName &&
      blackEmail &&
      pgn &&
      date &&
      gameType
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  useEffect(() => {
    checkValid();
  }, [whiteName, whiteEmail, blackName, blackEmail, pgn, date, gameType]);

  return (
    <div className="flex flex-col h-screen justify-center items-center max-w-lg mx-auto sm:px-4">
      <div className="text-center p-8 w-full">
        <h2 className="text-2xl font-bold mb-4">White</h2>
        <Checkbox
          isSelected={winner === "white"}
          onValueChange={() => setWinner(winner === "white" ? null : "white")}
          className="mb-4"
        >
          Winner
        </Checkbox>
        <Input
          value={whiteName}
          className="mb-4 w-full"
          variant="underlined"
          label="Name"
          onChange={(e) => setWhiteName(e.target.value)}
        />
        <Input
          value={whiteUser}
          className="mb-4 w-full"
          variant="underlined"
          label="Chess Username"
          onChange={(e) => setWhiteUser(e.target.value)}
        />
        <Input
          onChange={(e) => setWhiteEmail(e.target.value)}
          variant="underlined"
          className="w-full"
          placeholder="Email"
          value={whiteEmail}
          startContent={<BiLogoGmail />}
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">
                @hjuhsd.k12.ca.us
              </span>
            </div>
          }
        />
      </div>

      <Divider className="mx-10" />
      <div className="text-center p-4">
        <Button className="w-full" color="primary" onPress={handleOpenModal}>
          Confirm Data
        </Button>
      </div>
      <Divider className="mx-10" />

      <div className="text-center bg-black text-white p-8 w-full">
        <h2 className="text-2xl font-bold mb-4">Black</h2>
        <Checkbox
          isSelected={winner === "black"}
          onValueChange={() => setWinner(winner === "black" ? null : "black")}
          className="mb-4"
        >
          Winner
        </Checkbox>
        <Input
          onChange={(e) => setBlackName(e.target.value)}
          value={blackName}
          className="mb-4 w-full"
          variant="underlined"
          label="Name"
        />
        <Input
          value={blackUser}
          className="mb-4 w-full"
          variant="underlined"
          label="Chess Username"
          onChange={(e) => setBlackUser(e.target.value)}
        />
        <Input
          onChange={(e) => setBlackEmail(e.target.value)}
          variant="underlined"
          className="w-full"
          placeholder="Email"
          value={blackEmail}
          startContent={<BiLogoGmail />}
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">
                @hjuhsd.k12.ca.us
              </span>
            </div>
          }
        />
      </div>

      <Modal
        backdrop="blur"
        size="full"
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Confirm Game Data
              </ModalHeader>
              <ModalBody className="px-4 sm:px-0">
                <Textarea
                  className="mb-4 w-full"
                  label="Enter PGN"
                  value={pgn}
                  onChange={(e) => setPgn(e.target.value)}
                />
                <Input
                  value={date}
                  className="mb-4 w-full"
                  label="mm/dd/yyyy"
                  onChange={(e) => setDate(e.target.value)}
                />
                <Select
                  value={gameType}
                  className="mb-4 w-full"
                  placeholder="Select game type"
                  onChange={(e) => setGameType(e.target.value)}
                >
                  <SelectItem key="chess.com" value="chess.com">
                    Chess.com
                  </SelectItem>
                  <SelectItem key="otb" value="otb">
                    Over the board
                  </SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter className="px-4 sm:px-0">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  Submit Game
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Log;
