import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useContext, createContext, PropsWithChildren, useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";

const SocketContext = createContext<{
	socket: null | Socket;
}>({
	socket: null,
});

export function useSocket() {
	return useContext(SocketContext);
}

function SocketProvider({ children }: PropsWithChildren) {
	const [socket, setSocket] = useState<Socket | null>(null);
	const { data, status } = useSession();

	useEffect(() => {
		async function connect() {
			if (socket) return;
			if (status === "authenticated") {
				const { access_token } = data.user;
				if (access_token) {
					const socket = await io(process.env.NEXT_PUBLIC_SOCKER_URL ?? "", {
						query: {
							secretToken: access_token,
						},
						transports: ["websocket"],
						extraHeaders: {
							"Access-Control-Allow-Origin": "http://localhost:3000",
						},
					});
					socket.connect();
					setSocket(socket);
				}
			}
		}

		connect();
	}, [status, data, socket]);

	useEffect(() => {
		if (socket) {
			console.log("socket id ======>", socket.id);
			socket.on("connect", () => {
				console.log("socket id ======>", socket.id);
			});
			socket.on("successResponse", console.log);
			socket.on("errorResponse", console.log);
		}
	}, [socket]);

	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
}

export default SocketProvider;
