import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Button,
  Chip,
  Divider,
  useDisclosure,
  Code,
  Kbd,
} from "@nextui-org/react";
import { ConfirmationModal } from "../components/confirmation";
import { LoginModal } from "../components/login";
import { AdminTable } from "@/components/admin/AdminTable";
const TournamentRegistrations: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const loginModal = useDisclosure();
  const confirmModal1 = useDisclosure();
  const confirmModal2 = useDisclosure();
  const confirmModal3 = useDisclosure();

  const fetchData = async () => {
    const res = await fetch("/api/fetchTournamentRegistrations");
    const data = await res.json();
    console.log("Data from API:", data);

    setRegistrations(data);
  };

  const fetchGames = async () => {
    try {
      const res = await fetch("/api/fetchTable");
      const data = await res.json();
      setGames(data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchData();
      fetchGames();
    }
  }, [authenticated]);

  const handleAuthentication = () => {
    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      setAuthenticated(true);
      loginModal.onClose();
    } else {
      alert("Incorrect password.");
    }
  };

  const handleFinalConfirmation = async () => {
    await fetch("/api/fetchTournamentRegistrations", { method: "DELETE" });
    setRegistrations([]);
  };

  return (
    <>
      {authenticated ? (
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center my-4">
            <h1 className="text-4xl md:mr-4 mb-4 md:mb-0 font-bold">
              view registrations.
            </h1>
            <div className="flex flex-col items-center md:mr-4 mt-4 mb-4 md:mb-0">
              <Kbd keys={["command"]}>+ R</Kbd>
              <span className="text-xs mt-1">to logout</span>
            </div>
            <Button
            fullWidth
              className="mt-4 mb-4 md:mb-0 flex flex-col items-center"
              variant="ghost"
              color="danger"
              size="md"
              onClick={confirmModal1.onOpen}
            >
              clear regs
            </Button>
          </div>
          <div className="flex flex-wrap -m-2">
            {registrations.map((registration, index) => (
              <div key={index} className="w-1/2 p-2">
                <Card className="max-w-[400px] mx-auto">
                  <CardHeader className="flex gap-3">
                    <p className="text-md">{registration.name}</p>
                    <Chip color="primary" variant="shadow">
                      {registration.rating}
                    </Chip>
                  </CardHeader>
                  <CardBody>
                    <p>
                      email: <Code>{registration.email}</Code>
                    </p>
                    <p>
                      chess.com username:{" "}
                      <Code>{registration.chessUsername}</Code>
                    </p>
                  </CardBody>
                  <CardFooter className="flex justify-center">
                    <Checkbox />
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
            <div className="flex flex-col  justify-center ">

            <h1 className="text-3xl text-center md:mr-4 mb-4 md:mb-0 font-bold">
              check the games.
            </h1>

          <AdminTable games={games} className="w-full mt-8"/>
          </div>

        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="mb-4 text-xl font-bold">
              you gotta sign in to view the admin stuff:
            </h1>
            <Button variant="light" color="success" onClick={loginModal.onOpen}>
              click here to do it
            </Button>
          </div>
        </div>
      )}

      <LoginModal
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        onConfirm={handleAuthentication}
        setPassword={setPassword}
      />
      <ConfirmationModal
        isOpen={confirmModal1.isOpen}
        onClose={confirmModal1.onClose}
        onConfirm={confirmModal2.onOpen}
        message="Are you sure you want to clear all registrations?"
      />
      <ConfirmationModal
        isOpen={confirmModal2.isOpen}
        onClose={confirmModal2.onClose}
        onConfirm={confirmModal3.onOpen}
        message="Are you absolutely sure?"
      />
      <ConfirmationModal
        isOpen={confirmModal3.isOpen}
        onClose={confirmModal3.onClose}
        onConfirm={handleFinalConfirmation}
        message="Final confirmation. All registrations will be permanently cleared!"
      />
    </>
  );
};

export default TournamentRegistrations;
