"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type User = {
  id: number;
  username: string;
  global_name: string;
  avatar: string;
};

function UserProfile() {
  const [userData, setUserData] = useState<User>();
  const [error, setError] = useState<string | undefined>();

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        setError("Failed to fetch user data");
        return;
      }

      const data = await response.json();

      setUserData(data);
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  });

  return (
    <div className="justify-end flex h-fit m-2 gap-2">
      {error ? (
        <button className="bg-green-600 font-nunito hover:bg-emerald-700 p-1 rounded-lg transition-colors">
          <Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/login`}>
            Login
          </Link>
        </button>
      ) : (
        <>
          {userData && (
            <Image
              src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}?size=64`}
              alt="Failed to load"
              width={64}
              height={64}
              className="rounded-full"
            />
          )}
          <button className=" font-nunito p-2 bg-green-600 hover:bg-emerald-700 transition-colors rounded-lg">
            <Link
              href={`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`}
              scroll={false}
            >
              Logout
            </Link>
          </button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
