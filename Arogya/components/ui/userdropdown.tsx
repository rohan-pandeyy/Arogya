"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Avatar,
  User,
} from "@heroui/react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";


export const PlusIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M6 12h12" />
      <path d="M12 18V6" />
    </g>
  </svg>
);

export default function UserDropdown() {
  const { user } = useUser();
  const { setUser } = useUser(); // ✅ correct
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:80/users/logout", {
        method: "POST",
        credentials: "include",
      });
  
      if (res.ok) {
        setUser(null); // clear user context
        router.push("/"); // redirect to homepage or login
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (!user) return null;

  const firstName = user.name.split(" ")[0];
  const initial = firstName.charAt(0).toUpperCase();

  return (
    <Dropdown
      showArrow
      classNames={{
        base: "before:bg-default-200",
        content: "p-0 border-small border-divider bg-[#e4ffe8] text-white font-inter",
      }}
      radius="sm"
    >
      <DropdownTrigger>
        <Avatar
          isBordered
          className="cursor-pointer bg-success text-white border-black text-medium"
          name={initial}
        />
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Profile Menu"
        className="p-3"
        disabledKeys={["profile"]}
        // onAction={(key) => {
        //   if (key === "dashboard") router.push("/UserDashboard/dashboard");
        //   else if (key === "settings") router.push("/settings");
        //   else if (key === "enquire") router.push("/enquire");
        // }}
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "font-semibold",
            "text-black",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection showDivider aria-label="Profile & Actions">
          <DropdownItem key="profile" isReadOnly className="h-14 gap-2 opacity-100">
            <User
              avatarProps={{
                size: "sm",
                name: initial,
              }}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              name={firstName}
              description={user.email}
            />
          </DropdownItem>
          <DropdownItem key="dashboard" onClick={() => router.push("/dashboard")}>
              Dashboard
            </DropdownItem>
          <DropdownItem key="settings" onClick={() => router.push("/user-dashboard")}>Settings</DropdownItem>
          <DropdownItem key="enquire" endContent={<PlusIcon className="text-large" />}>
            Enquire
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout"
           className="!text-red-500 hover:!text-white hover:!bg-red-500" onClick={handleLogout}>Log Out </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
