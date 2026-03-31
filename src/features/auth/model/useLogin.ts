import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import { useUserStore } from "@/entities/user";
import type { LoginFormData } from "./schemas";

export function useLogin() {
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      const { data } = await api.post("/auth/login", credentials);
      return data;
    },
    onSuccess: (data) => {
      if (data?.user) {
        setUser(data.user);
      }
    },
  });
}
