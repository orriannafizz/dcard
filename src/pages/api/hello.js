import { Octokit } from "@octokit/rest";
import { useSession } from "next-auth/react";
const { data: session } = useSession();

const octokit = new Octokit({

	auth: session.accessToken,

})

await octokit.request('POST /repos/{owner}/{repo}/issues', {
	owner: 'OWNER',
	repo: 'REPO',
	title: 'Found a bug',
	body: 'I\'m having a problem with this.',
	assignees: [
		'octocat'
	],
	milestone: 1,
	labels: [
		'bug'
	],
	headers: {
		'X-GitHub-Api-Version': '2022-11-28'
	}
})