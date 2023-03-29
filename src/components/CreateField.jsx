import React, { useState } from "react";
import { Octokit } from "@octokit/rest";

import { Button, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
const CreateField = (props) => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [bodyError, setBodyError] = useState(false);
	const { data: session } = useSession();

	const validateBody = (text) => {
		if (text.length >= 30) {
			setBodyError(false);
		} else {
			setBodyError(true);
		}
	};

	const createIssue = async () => {
		if (session) {
			const octokit = new Octokit({
				auth: session.accessToken,
			});
			try {
				const response = await octokit.rest.issues.create({
					owner: "orriannafizz",
					repo: "MY_TASKS",
					title: title,
					body: body,
				});
				console.log(response);
				//props.onIssueCreated(); // Notify the parent component to refresh the issues list
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleClick = () => {
		if (!bodyError && title !== "") {
			createIssue();
			setTitle(""); // Clear the title input
			setBody(""); // Clear the body input
		}
	};

	return (
		<div className="space-x-10 py-4">
			<TextField
				id="input-title"
				label="Title"
				variant="outlined"
				required
				value={title} // Set the value of the input to the state value
				onChange={(event) => setTitle(event.target.value)}
			/>
			<TextField
				id="input-body"
				label="Body"
				variant="outlined"
				error={bodyError}
				helperText={bodyError ? "At least 30 characters" : ""}
				value={body} // Set the value of the input to the state value
				onChange={(event) => {
					setBody(event.target.value);
					validateBody(event.target.value);
				}}
			/>
			<Button variant="outlined" onClick={() => handleClick()}>
				New Task
			</Button>
		</div>
	);
};

export default CreateField;
