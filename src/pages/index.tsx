import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Home() {
	const router = useRouter();
	useEffect(() => {
		router.replace("/dashboard");
	}, []);

	return <div>Redirecting to home...</div>;
}

export default Home;
