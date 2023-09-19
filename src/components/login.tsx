import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  ModalBody,
  Checkbox,
  Link,
} from "@nextui-org/react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  setPassword: (password: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  setPassword,
}) => {
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Modal classNames={{
        body: "py-6",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }} backdrop="blur" isOpen={isOpen} onOpenChange={onClose} placement="center">
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              log in right here.
            </ModalHeader>
            <ModalBody>
              <Input
                label="password"
                variant="underlined"
                type="password"
                onChange={handlePasswordChange}
                isClearable
                isRequired
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                close
              </Button>
              <Button color="primary" onPress={onConfirm}>
                authenticate
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
