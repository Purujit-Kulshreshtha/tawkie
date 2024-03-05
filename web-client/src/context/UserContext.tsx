import { ReactElement, createContext, useEffect, useMemo } from "react";
import { User } from "../types";
import { IContextValue, useIContext } from "./contextValue";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

type UserContextType = {
  username?: IContextValue<string>;
  channelsIn?: IContextValue<string[]>;
  setUser: (user: User, callback?: () => void) => void;
  clear: () => void;
};

interface Props {
  children: ReactElement;
}

export const UserContext = createContext<UserContextType>({
  setUser: () => true,
  clear: () => 0,
});

export function UserContextProvider({ children }: Props) {
  const currentUser: User = JSON.parse(localStorage.getItem("user") || `{}`);

  const username = useIContext<string>(currentUser.username || "");
  const channelsIn = useIContext<string[]>(currentUser.channelsIn || [""]);

  const value: UserContextType = useMemo(() => {
    return {
      username,
      channelsIn,

      setUser: (user: User, callback) => {
        if (!user) return;
        if (!user.username) return;

        username.setValue(user.username);
        channelsIn.setValue(user.channelsIn);

        localStorage.setItem("user", JSON.stringify(user));
        if (callback) {
          callback();
        }
      },

      clear: () => {
        username.clear();
        channelsIn.clear();
        localStorage.removeItem("user");
      },
    };
  }, [username, channelsIn]);

  useEffect(() => {
    const getAndSetUser = async () => {
      if (value.username && value.username.value !== "") {
        const url = `${backendUrl}/users/${value.username.value}`;
        const data = await (await fetch(url)).json();
        value.setUser(data);
      }
    };
    getAndSetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
