import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "@mui/material";
export default function Login(props) {
	const { data: session } = useSession();

	return (
		<header className="bg-white text-gray-800 px-4 py-3 flex justify-between items-center shadow-md">
			<div className="flex items-center">
				<span className="font-semibold text-lg">Task Manager</span>
			</div>
			<div className="flex items-center space-x-4">
				{session && (
					<Image
						src={session.user.image}
						alt="Profile"
						width="32"
						height="32"
						className="rounded-full"
					/>
				)}
				{session && (
					<span className=" font-semibold tracking-wide">
						{session.user.name}
					</span>
				)}

				<Button
					variant="outlined"
					onClick={session ? () => signOut() : () => signIn()}>
					{session ? "Sign out" : "Sign in"}
				</Button>
			</div>
		</header>
	);
}
