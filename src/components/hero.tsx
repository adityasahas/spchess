import React from 'react';
import { Button, Link } from '@nextui-org/react';

const Hero: React.FC = () => {
  return (
    <div className="text-white h-screen flex flex-col justify-center items-center">
      <div className="text-6xl font-bold mb-4 text-center">
        Sierra Pacific Chess Club
      </div>
      <div className="text-xl font-bold  text-center mb-4">
        A high school chess club based in Hanford, California.
      </div>
      <Button  as={Link} color="success" href="/join" variant="shadow">

        Join Club
      </Button>
    </div>
  );
};

export default Hero;