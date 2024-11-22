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
			className={"formField"}>
			<div className={"formInputContainer"}>
				<Form.Label className={"formLabel"}>Avatar</Form.Label>
				<Form.Control asChild>
					<Button
						type='button'
						className={"toggle"}
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
