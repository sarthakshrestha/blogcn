import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth-store";

export const useAuth = (requireAuth = false) => {
  const router = useRouter();
  const { user, token, isAuthenticated, login, logout, register } =
    useAuthStore();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, requireAuth, router]);

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    register,
  };
};
