"use client";
import React, { useRef, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { Avatar } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import UserDropdown from "@/components/ui/userdropdown";

export const ArogyaLogo = () => {
  return (
    <img src="/arogya_black.svg" width={37} height={37} alt="Arogya Logo" />
  );
};

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [aboutDropdown, setAboutDropdown] = React.useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = React.useState(false);
  const { openModal } = useModal();
  const { user } = useUser();
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  const aboutLinks = [
    { label: "About Us", href: "/about-us" },
    { label: "Services Offered", href: "/services-offered" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Blog", href: "/blog" },
  ];

  const menuItems = [
    { label: "Appointments", href: "/book-an-appointment" },
    { label: "Reports", href: "/my-reports" },
    { label: "About", isDropdown: true },
    { label: "PhysioGya", href: "/physiogya" },
    { label: "Call an Ambulance", href: "/" },
  ];

  useEffect(() => {
    // close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node)
      ) {
        setAboutDropdown(false);
      }
    }
    if (aboutDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aboutDropdown]);

  return (
    <Navbar
      className="fixed top-0 left-0"
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="xs:hidden"
      />
      <NavbarBrand>
        <Link href="/" color="foreground" className="flex items-center gap-4">
          <ArogyaLogo />
          <p className="font-bold text-inherit font-specialGothic">
            Arogya&#8482;
          </p>
        </Link>
      </NavbarBrand>

      <NavbarContent
        className="hidden xs:flex gap-6 font-plusjakarta"
        justify="center"
      >
        <NavbarItem>
          <Link
            href="/book-an-appointment"
            className={
              pathname === "/book-an-appointment"
                ? "text-primary font-semibold"
                : ""
            }
            color="foreground"
          >
            Appointments
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            href="/my-reports"
            className={
              pathname === "/my-reports" ? "text-primary font-semibold" : ""
            }
            color="foreground"
          >
            Reports
          </Link>
        </NavbarItem>

        <NavbarItem className="relative">
          <div ref={aboutDropdownRef}>
            <button
              className={`flex items-center gap-1 hover:text-gray-700 focus:outline-none ${aboutLinks.some((link) => link.href === pathname) ? "text-primary font-semibold" : ""}`}
              aria-haspopup="true"
              aria-expanded={aboutDropdown}
              onClick={() => setAboutDropdown((v) => !v)}
              type="button"
            >
              About
              <ChevronDownIcon className="w-4 h-4" />
            </button>
            {aboutDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 border">
                {aboutLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-2 hover:bg-gray-100 font-plusjakarta ${pathname === link.href ? "text-primary font-semibold" : ""}`}
                    color="foreground"
                    onClick={() => setAboutDropdown(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </NavbarItem>

        <NavbarItem>
          <Link
            href="/physiogya"
            className={
              pathname === "/physiogya" ? "text-primary font-semibold" : ""
            }
            color="foreground"
          >
            PhysioGya
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="font-plusjakarta" justify="end">
        <NavbarItem className="hidden xxs:block">
          <Link
            href="/"
            className={pathname === "/" ? "text-primary font-semibold" : ""}
            color="danger"
          >
            Call an Ambulance
          </Link>
        </NavbarItem>

        {user ? (
          <NavbarItem>
            <UserDropdown />
          </NavbarItem>
        ) : (
          <>
            {/*<NavbarItem>
              <Button onPress={() => openModal("signup")} variant="flat" color="success">
                Sign Up
              </Button>
            </NavbarItem>*/}

            <NavbarItem>
              <Button
                onPress={() => openModal("signin")}
                variant="flat"
                className="bg-green-500/25 text-green-800 hover:bg-green-500 hover:text-black hover:font-extrabold"
              >
                Sign In
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu className="sm:w-vw h-max items-center">
        {menuItems.map((item, index) => {
          if (item.isDropdown) {
            return (
              <React.Fragment key="about-dropdown">
                <NavbarMenuItem className="border-b">
                  <button
                    className={`flex items-center justify-between w-full py-3 font-plusjakarta ${aboutLinks.some((link) => link.href === pathname) ? "text-primary font-semibold" : ""}`}
                    onClick={() => setAboutMenuOpen((v) => !v)}
                    aria-haspopup="true"
                    aria-expanded={aboutMenuOpen}
                    type="button"
                  >
                    About
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform ${aboutMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </NavbarMenuItem>
                {aboutMenuOpen &&
                  aboutLinks.map((link) => (
                    <NavbarMenuItem key={link.href} className="border-b pl-6">
                      <Link
                        className={`font-plusjakarta w-full py-3 ${pathname === link.href ? "text-primary font-semibold" : ""}`}
                        color="foreground"
                        href={link.href}
                        size="lg"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setAboutMenuOpen(false);
                        }}
                      >
                        {link.label}
                      </Link>
                    </NavbarMenuItem>
                  ))}
              </React.Fragment>
            );
          }
          const isActive = pathname === item.href;
          return (
            <NavbarMenuItem key={item.href} className="border-b">
              <Link
                className={`font-plusjakarta w-full py-3 ${isActive ? "text-primary font-semibold" : ""}`}
                color={index === menuItems.length - 1 ? "danger" : "foreground"}
                href={item.href}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}
