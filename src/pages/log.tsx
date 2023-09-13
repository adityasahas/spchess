import React from "react";
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
} from "@nextui-org/react";
import {BiLogoGmail} from "react-icons/bi";

const Log: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModal = () => {
    onOpen();
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center max-w-lg mx-auto">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">White</h2>
        <Input className="mb-4 w-full" variant="underlined" label="Name" />
        <Input
          variant="underlined"
          className="w-full"
          placeholder="Email"
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

      <div className="text-center bg-black text-white p-8">
        <h2 className="text-2xl font-bold mb-4">Black</h2>
        <Input className="mb-4 w-full" variant="underlined" label="Name" />
        <Input
          variant="underlined"
          className="w-full"
          placeholder="Email"
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

      <Modal backdrop="blur" size="5xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Confirm Game Data
              </ModalHeader>
              <ModalBody>
                <Textarea
                  className="mb-4 w-full"
                  label="Enter PGN"
                />
                <Input type="datetime-local" className="mb-4 w-full" />
                <Select className="mb-4 w-full" placeholder="Select game type">
                  <SelectItem key="lichess" value="lichess">
                    Lichess
                  </SelectItem>
                  <SelectItem key="chess.com" value="chess.com">
                    Chess.com
                  </SelectItem>
                  <SelectItem key="otb" value="otb">
                    Over the board
                  </SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
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
