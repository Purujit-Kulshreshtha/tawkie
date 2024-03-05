import { io } from "socket.io-client";
export const socket = io(process.env.REACT_APP_BACKEND_URL, {
    autoConnect: false,
    extraHeaders: {
        "ngrok-skip-browser-warning": "69420",
    },
});
//# sourceMappingURL=socket.js.map