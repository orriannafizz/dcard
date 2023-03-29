import { Octokit } from "@octokit/rest";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Login from "../../components/Login";
import AllTask from "../../components/AllTask";
import CreateField from "../../components/CreateField";
const MyComponent = () => {
	const { data: session } = useSession();
	const [refreshKey, setRefreshKey] = useState(0);

	const refreshIssues = () => {
		setRefreshKey((prevKey) => prevKey + 1);
	};

	const [repo, setRepo] = useState(null);
	const [issues, setIssues] = useState([]);
	const owner = "orriannafizz";
	useEffect(() => {
		if (session) {
			const octokit = new Octokit({
				auth: session.accessToken,
			});

			const fetchIssues = async () => {
				try {
					const response = await octokit.rest.issues.listForRepo({
						owner: session.user.name,
						repo: "MY_TASKS",
					});
					setIssues(response.data);
					console.log(response.data);
				} catch (error) {
					console.error("Error fetching issues:", error);
				}
			};
			console.log(session);
			fetchIssues();
		}
	}, [session, refreshKey]);

	return (
		<div>
			<Login />
			<div className="items-center flex flex-col justify-center">
				<CreateField onIssueCreated={refreshIssues} />
				<AllTask issues={issues} session={session} setIssues={setIssues} />
			</div>
		</div>
	);
};

export default MyComponent;
