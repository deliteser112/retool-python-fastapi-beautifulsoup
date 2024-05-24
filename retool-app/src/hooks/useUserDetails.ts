// src/hooks/useUserDetails.ts
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User } from "../types/user";
import { findUserById } from "../features/users/usersAPI";

const useUserDetails = (userId: string | null) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) return;

      setIsLoading(true);
      try {
        const data = await findUserById(userId);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setError("Failed to fetch user");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, router]);

  return { user, isLoading, error };
};

export default useUserDetails;
