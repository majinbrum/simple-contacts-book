import { useEffect, useState } from "react";
import style from "./ErrorBox.module.css";
import { ErrorBoxProps } from "../../../types/types";

import ErrorBlob from "/errorBlob.png";
import { Link } from "react-router-dom";
import { HomeIcon } from "../../../assets/icons";

function ErrorBox(props: ErrorBoxProps) {
	const { message } = props;
	const [errorMessage, setErrorMessage] = useState(message);

	const refineErrorMessage = () => {
		if (message == "JSON object requested, multiple (or no) rows returned") {
			setErrorMessage("Oops! There are no results with this ID. ");
		} else if (message == "There are no groups with this tag.") {
			setErrorMessage("There are no groups with this tag. You can create one and then come back!");
		} else {
			setErrorMessage("Oops! Something went wrong. ");
		}
	};

	useEffect(() => {
		refineErrorMessage();
	}, []);

	return (
		<div className={style.errorContainer}>
			<img
				src={ErrorBlob}
				alt='Error Image'
			/>
			<h4 className={style.errorMessage}>{errorMessage}</h4>
			<Link
				className={style.errorLink}
				to={"/"}>
				<span>{HomeIcon}</span>
				Go back home
			</Link>
		</div>
	);
}

export default ErrorBox;
