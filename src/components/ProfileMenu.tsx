"use client";
import { useState } from "react";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

export default function ProfileMenu({ user }: { user: User }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const imageUrl = user?.image || "";
  const isMenuOpen = Boolean(anchorEl);

  const onSignOut = async () => {
    await signOut();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        className="foc focus-visible:rounded-full"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          width={40}
          height={40}
          alt="User logo"
          className="cursor-pointer rounded-full ring-1 ring-gray-300"
        />
      </button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isMenuOpen}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        className="mt-2"
      >
        <div className="my-menu">
          <p className="font-semibold">
            {user?.firstName + " " + user?.lastName}
          </p>
          <p className="text-placeholder">{user?.email}</p>
          <div className="my-3 h-[1px] w-full bg-divider"></div>
          <div className="flex flex-col">
            <Link href="/profile" className="my-btn-menu">
              Profile
            </Link>
            <Link href="/jobs" className="my-btn-menu">
              Search jobs
            </Link>
            <button className="my-btn-menu danger" onClick={onSignOut}>
              Sign out
            </button>
          </div>
        </div>
      </Menu>
    </>
  );
}
