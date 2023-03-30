import React, { useState } from "react";
import { Octokit } from "@octokit/rest";
import {
	Box,
	CardContent,
	Typography,
	IconButton,
	Grid,
	Menu,
	MenuItem,
	Button,
	ListItemText,
	ListItemIcon,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { useSession } from "next-auth/react";

const CardItem = (props) => {
	const [status, setStauts] = useState(props.issue.state);
	const [anchorEl, setAnchorEl] = useState(null);
	const [anchorElStatus, setAnchorElStatus] = useState(null);

	const { data: session } = useSession();

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleStatusClick = (event) => {
		setAnchorElStatus(event.currentTarget);
	};
	const [a, setA] = useState(0);
	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	const handleStatusClose = () => {
		setAnchorElStatus(null);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const deleteIssue = async () => {
		if (session) {
			const octokit = new Octokit({
				auth: session.accessToken,
			});

			try {
				await octokit.rest.issues.update({
					owner: "orriannafizz",
					repo: "MY_TASKS",
					issue_number: props.issue.number,
					state: "closed",
				});
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const handleDelete = () => {
		deleteIssue();
		handleClose();
	};
	return (
		<div>
			<CardContent className="shadow-xl rounded-xl max-w-lg">
				<Grid container alignItems="center" justifyContent="space-between">
					<Grid item>
						<Button
							variant="outlined"
							color="inherit"
							onClick={handleStatusClick}
							size="small">
							{props.issue.labels.length === 0
								? "Open"
								: props.issue.labels[0].name}
						</Button>
						<Menu
							anchorEl={anchorElStatus}
							open={Boolean(anchorElStatus)}
							onClose={handleStatusClose}>
							<MenuItem className="text-gray-600">
								<ListItemIcon>
									<div className="bg-gray-600 w-2 h-2"></div>
								</ListItemIcon>
								<ListItemText primary="Open" />
							</MenuItem>
							<MenuItem className="text-red-500">
								<ListItemIcon>
									<div className="bg-red-500 w-2 h-2"></div>
								</ListItemIcon>
								<ListItemText primary="In Progress" />
							</MenuItem>
							<MenuItem className="text-green-500">
								<ListItemIcon>
									<div className="bg-green-500 w-2 h-2"></div>
								</ListItemIcon>
								<ListItemText primary="Done" />
							</MenuItem>
						</Menu>
					</Grid>

					<Grid item>
						<Typography sx={{ fontSize: 18 }} className="tracking-wider">
							{props.issue.title}#{props.issue.number}
						</Typography>
					</Grid>
					<Grid item>
						<IconButton edge="end" color="inherit" onClick={handleMenuClick}>
							<MoreVertIcon />
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}>
							<MenuItem onClick={handleMenuClose} className=" text-gray-600 ">
								<DriveFileRenameOutlineOutlinedIcon className="mr-2" />
								Edit
							</MenuItem>
							<MenuItem className="text-red-500" onClick={handleDelete}>
								<DeleteOutlineIcon className="mr-2" />
								Delete
							</MenuItem>
						</Menu>
					</Grid>
				</Grid>
				<Box
					sx={{
						mb: 1.5,
						maxHeight: "150px", // You can adjust this value to fit your needs
						overflowY: "auto",
					}}>
					<Typography color="text.secondary">{props.issue.body}</Typography>
				</Box>
			</CardContent>
		</div>
	);
};

export default CardItem;
