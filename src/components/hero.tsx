import React from 'react';
import { Button, Link } from '@nextui-org/react';

const Hero: React.FC = () => {
  return (
    <div className="text-white h-screen flex flex-col justify-center items-center">
      <div className="text-6xl font-bold mb-4">
        Sierra Pacific Chess Club
      </div>
      <div className="text-xl mb-8">
        A high school chess club based in Hanford, California.
      </div>
      <Button  as={Link} color="success" href="/join" variant="shadow">

        Join Club
      </Button>
    </div>
  );
};

export default Hero;