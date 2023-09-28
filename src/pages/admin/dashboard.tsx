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
import { ConfirmationModal } from "../../components/confirmation";
import { LoginModal } from "../../components/login";
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
  const confirmModal4 = useDisclosure();
  const confirmModal5 = useDisclosure();
  const confirmModal6 = useDisclosure();
  const confirmModal7 = useDisclosure();
  const confirmModal8 = useDisclosure();

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

  const handleAuthentication = async () => {
    try {
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
        }),
      });
  
      if (response.ok) {
        setAuthenticated(true);
        loginModal.onClose();
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
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
              variant="light"
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
        message="are you really sure?"
      />
      <ConfirmationModal
        isOpen={confirmModal3.isOpen}
        onClose={confirmModal3.onClose}
        onConfirm={confirmModal4.onOpen}
        message="are you like fosho?"
      />
      <ConfirmationModal
        isOpen={confirmModal4.isOpen}
        onClose={confirmModal4.onClose}
        onConfirm={confirmModal5.onOpen}
        message="really"
      />
      <ConfirmationModal
        isOpen={confirmModal5.isOpen}
        onClose={confirmModal5.onClose}
        onConfirm={confirmModal6.onOpen}
        message="dude"
      />
      <ConfirmationModal
        isOpen={confirmModal6.isOpen}
        onClose={confirmModal6.onClose}
        onConfirm={confirmModal7.onOpen}
        message="come on"
      />
      <ConfirmationModal
        isOpen={confirmModal7.isOpen}
        onClose={confirmModal7.onClose}
        onConfirm={confirmModal8.onOpen}
        message="bro it ain't that serious"
      />
      <ConfirmationModal
        isOpen={confirmModal8.isOpen}
        onClose={confirmModal8.onClose}
        onConfirm={handleFinalConfirmation}
        message="fine you won"
      />
    </>
  );
};

export default TournamentRegistrations;
