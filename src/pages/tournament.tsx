import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure } from "@nextui-org/react";

const TournamentRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    chessUsername: "",
    rating: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const allFieldsFilled = formData.name && formData.email && formData.chessUsername && formData.rating;

  const handleSubmit = async () => {
    setIsLoading(true);
    const fullEmail = `${formData.email}@hjuhsd.k12.ca.us`;
    const submissionData = { ...formData, email: fullEmail };

    const res = await fetch("/api/registerTournament", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });

    const data = await res.json();

    if (data.success) {
      setFormData({
        name: "",
        email: "",
        chessUsername: "",
        rating: "",
      });
      setIsLoading(false);
      setIsSuccessModalOpen(true);

    } else {
      setIsLoading(false);
      setIsErrorModalOpen(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-10">
        <h1 className="font-bold text-5xl text-center mb-4">register for next tournament.</h1>
        <h1 className="font-bold text-3xl text-center mb-4">november-december.</h1>
        <Input
          label="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          variant="underlined"
          isRequired
        />
        <Input
          label="email"
          type="email"
          value={formData.email}
          variant="underlined"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400">@hjuhsd.k12.ca.us</span>
            </div>
          }
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          isRequired
        />
        <Input
          label="chess.com username"
          value={formData.chessUsername}
          onChange={(e) => setFormData({ ...formData, chessUsername: e.target.value })}
          variant="underlined"
          isRequired
        />
        <Input
          label="rating"
          type="number"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          variant="underlined"
          isRequired
        />
        <Button className="mt-20" color="success" fullWidth variant="shadow" isLoading={isLoading} onPress={handleSubmit} isDisabled={!allFieldsFilled}>
          register
        </Button>

        <Modal placement="center" isOpen={isErrorModalOpen} onOpenChange={() => setIsErrorModalOpen(!isErrorModalOpen)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="font-bold text-3xl text-center mb-4">error</ModalHeader>
                <ModalBody>you are already registered in this tournament.</ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal isOpen={isSuccessModalOpen} onOpenChange={() => setIsSuccessModalOpen(!isSuccessModalOpen)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="font-bold text-3xl text-center mb-4" >registered</ModalHeader>
                <ModalBody>you are now successfully registered in the tournament we will post the bracket the weekend before the tournament</ModalBody>
                <ModalFooter>
                  <Button color="success" variant="light" onPress={onClose}>
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

export default TournamentRegistration;
