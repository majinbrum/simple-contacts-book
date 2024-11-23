// CSS
import "./InputText.css";
// Interfaces
import { InputTextProps } from "../../../types/types";

const InputText = (props: InputTextProps) => {
	const { name, placeholder, value, setValue, icon } = props;

	return (
		<label
			htmlFor={name}
			className={"input--text__label"}>
			{icon || null}
			<input
				className={"input--text"}
				name={name}
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value.toLowerCase())}
			/>
		</label>
	);
};

export default InputText;
