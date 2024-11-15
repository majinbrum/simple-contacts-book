import { ButtonProps } from "../../../types/types";

const Button = (props: ButtonProps) => {
	const { type, onClick, label, className, disabled } = props;
	return (
		<button
			type={type}
			className={className}
			onClick={onClick}
			disabled={disabled}>
			{label}
		</button>
	);
};

export default Button;
