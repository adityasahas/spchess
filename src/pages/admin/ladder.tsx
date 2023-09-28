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
import  LadderAdmin  from "@/components/admin/AdminLadder";
import AdminLadder from "@/components/admin/AdminLadder";
const TournamentRegistrations: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const loginModal = useDisclosure();
 
  const confirmModal1 = useDisclosure();
  const confirmModal2 = useDisclosure();
  const confirmModal3 = useDisclosure();
  const confirmModal4 = useDisclosure();
  const confirmModal5 = useDisclosure();
  const confirmModal6 = useDisclosure();
  const confirmModal7 = useDisclosure();
  const confirmModal8 = useDisclosure();
 




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


  return (
    <>
      {authenticated ? (
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center my-4">
            <h1 className="text-4xl md:mr-4 mb-4 md:mb-0 font-bold">
              edit the ladder.
            </h1>
            <div className="flex flex-col items-center md:mr-4 mt-4 mb-4 md:mb-0">
              <Kbd keys={["command"]}>+ R</Kbd>
              <span className="text-xs mt-1">to logout</span>
            </div>
            
          </div>
          <AdminLadder/>

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
     
    </>
  );
};

export default TournamentRegistrations;
