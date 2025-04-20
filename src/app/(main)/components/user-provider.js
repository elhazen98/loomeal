"use client";

import { createContext, useContext } from "react";

export const UserContext = createContext({
    id: "",
    username: "",
    email: "",
});

export default function UserProvider({ user, children }) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
    return useContext(UserContext);
}
