
import React, { ReactNode } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
interface LayoutProps {
    children: ReactNode;
  }
  
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isBordered>
      <NavbarBrand>
      <Link  color="foreground" href="/" aria-current="page">

        <p className="font-bold text-inherit">Sierra Pacific Chess Club</p>
      </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link isBlock color="foreground" href="/" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link isDisabled isBlock href="#" color="foreground">
            Tournament Draw
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link isBlock color="foreground" href="#">
            Game Logs
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link  isBlock color="success" href="/log">Log a Game</Link>
        </NavbarItem>
        <NavbarItem>
          <Button isDisabled as={Link} color="success" href="#" variant="shadow" >
            Join Club
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="text-white text-center py-4">
        <p>&copy; 2023 Sierra Pacific Chess Club</p>
      </footer>
    </div>
  );
};

export default Layout;
