import React from 'react';
import { Divider, Button, Link, Snippet } from '@nextui-org/react';

const Join = () => {
  return (
    <div className="flex flex-col items-start justify-center min-h-screen px-8">
      <h1 className="text-5xl mb-4  font-bold leading-snug">Join Sierra Pacific Chess Club</h1>

      <p className="text-lg mb-4 leading-normal">
        We are excited to have you join our club! Below are the necessary steps and resources.
      </p>

      <Divider className="my-4 w-4/5" />

      <div className="mb-4 w-full">
        <h4 className="text-xl font-semibold mb-2">Google Classroom:</h4>
        <p className="leading-normal">Use code <Snippet variant="bordered" symbol="">h2dlccu</Snippet> to join our Google Classroom.</p>
      </div>

      <Divider className="my-4 w-4/5" />

      <div className="mb-4 w-full">
        <h4 className="text-xl font-semibold mb-2">Chess.com Club:</h4>
        <p className="leading-normal">
          Join our Chess.com club <Link href="/club" >here</Link>.
        </p>
      </div>

      <Divider className="my-4 w-4/5" />

      <div className="mb-4 w-full">
        <h4 className="text-xl font-semibold mb-2">Contact Information:</h4>
        <p className="leading-normal">
          Email us at 
          <Link href="mailto:25aayushraiyani@hjuhsd.k12.ca.us" className="underline">25aayushraiyani@hjuhsd.k12.ca.us </Link> <br/> or 
            <br/>
          <Link href="mailto:25adityasahasranam@hjuhsd.k12.ca.us" className="underline">25adityasahasranam@hjuhsd.k12.ca.us </Link> 
            <br/>
          for any questions.
        </p>
      </div>
    </div>
  );
};

export default Join;
