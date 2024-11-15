import style from "./Loader.module.css";

const LoaderIcon = (
	<svg
		viewBox='0 0 50 50'
		xmlns='http://www.w3.org/2000/svg'
		width='100'
		height='100'
		fill='none'>
		<path
			fill='var(--accent)'
			d='M17.179 13.605a.431.431 0 00.279.514l.775.245a.393.393 0 00.499-.268 7.318 7.318 0 00-4.5-8.658.39.39 0 00-.507.255l-.245.775a.43.43 0 00.261.523 5.69 5.69 0 013.438 6.614z'
		/>
	</svg>
);

const Loader = () => {
	return (
		<div className={style.loaderOverlay}>
			<div className={style.loaderIcon}>{LoaderIcon}</div>
		</div>
	);
};

export default Loader;
