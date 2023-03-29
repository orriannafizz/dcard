import { Octokit } from "@octokit/rest";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Login from "../components/Login";
import AllTask from "../components/AllTask";
import CreateField from "../components/CreateField";
const MyComponent = () => {
	const { data: session } = useSession();

	return (
		<div>
			<Login />
			<div className="items-center flex flex-col justify-center">
				<CreateField />
				<AllTask />
			</div>
		</div>
	);
};

export default MyComponent;
