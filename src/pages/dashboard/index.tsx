import { useSocket } from "@/context/SocketProvider";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function index() {
	const { socket } = useSocket();
	const { status, data } = useSession();
	const router = useRouter();
	// console.log(data?.user);

	// useEffect(() => {
	// 	if (status === "unauthenticated") {
	// 		router.replace("/auth/login");
	// 	}
	// }, [status]);

	return (
		<div>
			<div className="">{socket ? "Socket.io connected" : "Socket.io not connected!"}</div>
			<button
				onClick={() => {
					socket?.emit("fetchSprintList", {});
				}}
			>
				Send
			</button>
		</div>
	);
}

export default index;
