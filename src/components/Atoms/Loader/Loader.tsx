import { LoaderIcon } from "../../../assets/icons";
import style from "./Loader.module.css";

const Loader = () => {
	return (
		<div className={style.loaderOverlay}>
			<div className={style.loaderIcon}>{LoaderIcon}</div>
		</div>
	);
};

export default Loader;
