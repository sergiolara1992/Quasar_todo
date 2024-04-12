import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const user = {
    id: null,
    name: "",
    lastName: "",
    email: "",

    
  };

  const setUser = (userData) => {
    
    Object.assign(user, userData);
  };

  return {
    user,
    setUser,
  };
});
