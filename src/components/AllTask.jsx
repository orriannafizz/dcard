import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import { useSession } from "next-auth/react";
import CardItem from "./CardItem";
const AllTask = (props) => {
	const { data: session } = useSession();
	const [issues, setIssues] = useState([]);

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
					//console.log(response.data);
				} catch (error) {
					console.error("Error fetching issues:", error);
				}
			};
			fetchIssues();
			console.log(issues);
		}
	}, [session]);
	return (
		<div className="items-center flex flex-col justify-center">
			<ul>
				{" "}
				{issues.map((issue) => (
					<CardItem issue={issue} key={issue.id} />
				))}
			</ul>
		</div>
	);
};

export default AllTask;
