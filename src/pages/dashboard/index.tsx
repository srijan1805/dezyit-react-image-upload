import { useSocket } from "@/context/SocketProvider";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SPRINT_ID = "649b99d1b64dbc933eb32c4c";
const PERSONA_ID = "649baf28c98243a05d3d3de8";

function Index() {
	const { socket } = useSocket();
	const { status, data } = useSession();
	const router = useRouter();
	// console.log(data?.user);

	// useEffect(() => {
	// 	if (status === "unauthenticated") {
	// 		router.replace("/auth/login");
	// 	}
	// }, [status]);
	const [file, setFile] = useState<File | null>(null);

	function createPersona() {
		socket?.emit("addNewPersona", {
			sprintId: SPRINT_ID,
			name: "John",
			age: 25,
			photo: file,
			location: "London",
			job: "Software Developer",
			goals: ["some gloas"],
			bio: "john doe bio",
			motivation: ["some motive"],
			frustrations: ["some fffff"],
		});
		setFile(null);
	}

	function updatePersona() {
		socket?.emit("updatePersona", {
			sprintId: SPRINT_ID,
			personaId: PERSONA_ID,
			photo: file,
		});
		setFile(null);
	}

	return (
		<div className="space-y-10 p-10">
			<div>
				<div className="">
					{socket ? "Socket.io connected" : "Socket.io not connected!"}
				</div>
				<button
					onClick={() => {
						socket?.emit("fetchSprintList", {});
					}}
				>
					Send
				</button>
			</div>

			<div>
				<input
					onChange={(e) => {
						if (e.target.files) {
							setFile(e.target.files[0]);
						}
					}}
					className="mt-10"
					type="file"
					placeholder="Choose file"
				/>
				<button onClick={() => createPersona()} className="btn">
					Create Persona
				</button>
				{/* <button onClick={() => updatePersona()} className="btn">
					Update Persona
				</button> */}
			</div>
		</div>
	);
}

export default Index;
