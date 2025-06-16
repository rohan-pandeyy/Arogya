"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useModal } from "@/context/ModalContext"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@heroui/react";

export const ArogyaLogo = () => {
  return <img src="/assets/logo.png" width={37} height={37} alt="Arogya Logo" />;
};

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { openModal } = useModal();

  const menuItems = [
    { label: "Appointments", href: "/book-an-appointment" },
    { label: "Reports", href: "/my-reports" },
    { label: "Services", href: "/services" },
    { label: "PhysioGya", href: "/physiogya" },
    { label: "Call an Ambulance", href: "/" }
  ];

  return (
    <Navbar className="fixed top-0 left-0" shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="xs:hidden"
        />
      <NavbarBrand>
        <Link href="/" color="foreground" className="flex items-center gap-4">
          <ArogyaLogo />
          <p className="font-bold text-inherit font-specialGothic">Arogya</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden xs:flex gap-6 font-plusjakarta" justify="center">
        <NavbarItem>
          <Link href="/book-an-appointment" className={pathname === "/book-an-appointment" ? "text-primary font-semibold" : ""} color="foreground" >
          Appointments
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="/my-reports" className={pathname === "/my-reports" ? "text-primary font-semibold" : ""} color="foreground">
          Reports
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="/services" className={pathname === "/services" ? "text-primary font-semibold" : ""} color="foreground" >
          Services
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="/physiogya" className={pathname === "/physiogya" ? "text-primary font-semibold" : ""} color="foreground">
          PhysioGya
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="font-plusjakarta" justify="end">
        <NavbarItem className="hidden xxs:block">
          <Link href="/" className={pathname === "/" ? "text-primary font-semibold" : ""} color="danger">
          Call an Ambulance
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Button onPress={() => openModal("signup")} variant="flat" color="success">
          Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="sm:w-vw h-max items-center">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <NavbarMenuItem key={item.href} className="border-b">
              <Link className={`font-plusjakarta w-full py-3 ${ isActive ? "text-primary font-semibold" : "" }`}
              color={ index === menuItems.length - 1 ? "danger" : "foreground" }
              href={item.href}
              size="lg"
              onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}