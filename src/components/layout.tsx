import React, { ReactNode, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Divider,
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
    { title: "Game Archive", link: "/games", disabled: false },
    { title: "Chess.com Club", link: "/club", disabled: false },
  ];

  const mobileMenuItems = [
    { title: "Home", link: "/", disabled: false },
    {
      title: "Tournament Draw (will be open before tournament)",
      link: "#",
      disabled: true,
    },
    { title: "Game Archive", link: "/games", disabled: false },
    { title: "Chess.com Club", link: "/club", disabled: false },
    { title: "Admin Portal", link: "/admin/dashboard", disabled: false },
    { title: "Ladder Admin View", link: "/admin/ladder", disabled: false },
    { title: "Ladder ", link: "/ladder", disabled: false },

    { title: "Log a game", link: "/log", disabled: false },
  ];
  const footerLinks = [
    {
      title: "Club Links",
      items: ["Home", "Chess.com Club", "Join Club", "Ladder"],
      links: ["/", "/club", "/join", "/ladder"],
    },
    {
      title: "Game Management",
      items: ["Log a Game", "Game Archive", "Tournament Bracket"],
      links: ["/log", "/games", "/tournament"],
    },
    {
      title: "Admin",
      items: ["Admin Dashboard", "Ladder Admin View", "Tournament Admin View"],
      links: ["/admin/dashboard", "/admin/ladder", "/admin/dashboard"],
    },
  ];

  const currentYear = new Date().getFullYear();
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
            <Link isBlock color="success" href="/ladder">
              Ladder
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="success" href="/join" variant="shadow">
              Join Club
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {mobileMenuItems.map((item, index) => (
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
            <Button as={Link} color="success" href="/join" variant="ghost">
              Join Club
            </Button>
          </NavbarItem>
        </NavbarMenu>
      </Navbar>

      <main className="flex-grow">{children}</main>
      <Divider />
      <footer className="relative w-full mt-5">
        <div className="mx-auto w-full max-w-7xl px-8">
          <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
            <h5 className="mb-6 text-lg font-bold">
              sierra pacific chess club
            </h5>
            <div className="grid grid-cols-3 justify-between gap-4">
              {footerLinks.map(({ title, items, links }) => (
                <ul key={title}>
                  <li className="mb-3 font-medium text-gray-600 opacity-60 text-sm">
                    {title}
                  </li>
                  {items.map((item, index) => (
                    <li
                      key={item}
                      className="py-1.5 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <Link href={links[index]}>
                        <a>{item}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className="mt-12 flex w-full flex-col items-center justify-center border-t  py-4 md:flex-row md:justify-between">
            <p className="mb-4 text-center md:mb-0">
              &copy; {currentYear}{" "}
              <Link href="https://adityasahas.tech/">
                <a>made by adi</a>
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
