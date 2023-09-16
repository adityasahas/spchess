import React, { ReactNode, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { title: "Home", link: "/", disabled: false },
    { title: "Tournament Draw", link: "#", disabled: true },
    { title: "Game Archive", link: "/games", disabled: false },
    { title: "Chess.com Club", link: "/club", disabled: false },
  ];

  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{ width: "100% !important" }}
    >
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="w-full"
        style={{ width: "100% !important" }}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link color="foreground" href="/" aria-current="page">
              <p className="font-bold text-inherit">
                Sierra Pacific Chess Club
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={`${item.title}-${index}`}>
              <Link
                isBlock
                color="foreground"
                href={item.link}
                aria-current="page"
                isDisabled={item.disabled}
              >
                {item.title}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link isBlock color="success" href="/log">
              Log a Game
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="success" href="/join" variant="shadow">
              Join Club
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.title}-${index}`}>
              <Link
                color="foreground"
                className="w-full"
                href={item.link}
                size="lg"
                isDisabled={item.disabled}
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarItem>
            <Button as={Link} color="success" href="/log" variant="ghost">
              Log a Game
            </Button>
          </NavbarItem>
        </NavbarMenu>
      </Navbar>

      <main className="flex-grow">{children}</main>
      <footer className="flex flex-col text-white text-center py-4">
        <p>&copy; 2023 Sierra Pacific Chess Club</p>
        <p>made by adi</p>
      </footer>
    </div>
  );
};

export default Layout;
