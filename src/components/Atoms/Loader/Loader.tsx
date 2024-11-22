// CSS
import style from "./Loader.module.css";
// Assets
import { LoaderIcon } from "../../../assets/icons";

const Loader = () => {
	return (
		<div className={style.loaderOverlay}>
			<div className={style.loaderIcon}>{LoaderIcon}</div>
		</div>
	);
};

export default Loader;
