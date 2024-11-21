// CSS
import style from "./InputText.module.css";
// Interfaces
import { InputTextProps } from "../../../types/types";

const InputText = (props: InputTextProps) => {
	const { name, placeholder, value, setValue, icon } = props;

	return (
		<label
			htmlFor={name}
			className={style.inputTextLabel}>
			{icon || null}
			<input
				className={style.inputText}
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
