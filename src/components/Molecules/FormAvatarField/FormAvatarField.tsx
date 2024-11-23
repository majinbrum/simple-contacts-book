// Radix UI components
import * as Form from "@radix-ui/react-form";
// Components
import Button from "../../Atoms/Button/Button";
// Assets
import { RepeatIcon } from "../../../assets/icons";
// Interfaces
import { FormAvatarFieldProps } from "../../../types/types";

const FormAvatarField = (props: FormAvatarFieldProps) => {
	const { onClick, disabled } = props;

	return (
		<Form.Field
			name='avatar'
			className={"form__field"}>
			<div className={"form__input__container"}>
				<Form.Label className={"form__label"}>Avatar</Form.Label>
				<Form.Control asChild>
					<Button
						type='button'
						className={"form__button--toggle"}
						onClick={onClick}
						disabled={disabled}
						label={RepeatIcon}
					/>
				</Form.Control>
			</div>
		</Form.Field>
	);
};

export default FormAvatarField;
