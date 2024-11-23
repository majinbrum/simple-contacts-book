// CSS
import "./Loader.css";
// Assets
import { LoaderIcon } from "../../../assets/icons";

const Loader = () => {
	return (
		<div className={"loader__overlay"}>
			<div className={"loader__icon"}>{LoaderIcon}</div>
		</div>
	);
};

export default Loader;
