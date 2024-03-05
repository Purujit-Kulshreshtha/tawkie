import { ReactElement, createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface Props {
  children: ReactElement;
}

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  connectSocket: () => void;
  disconnectSocket: () => void;
};

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  connectSocket: () => {},
  disconnectSocket: () => {},
});

export const SocketContextProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectSocket = () => {
    socket && socket.connect();
    setIsConnected(true);
  };

  const disconnectSocket = () => {
    socket && socket.disconnect();
    setIsConnected(false);
  };

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_BACKEND_URL || "", {
      extraHeaders: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    setSocket(newSocket);
    setIsConnected(true);

    return () => {
      disconnectSocket();
      newSocket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: SocketContextType = {
    socket,
    isConnected,
    connectSocket,
    disconnectSocket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
