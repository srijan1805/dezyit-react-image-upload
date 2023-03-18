import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Signin() {
	const { status } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (status === "unauthenticated")
			signIn("credentials", {
				email: "divyansh@dezyit.com",
				password: "divubaba",
			});
		if (status === "authenticated") router.replace("/");
	}, [status]);
	return <div>Signin</div>;
}

export default Signin;
