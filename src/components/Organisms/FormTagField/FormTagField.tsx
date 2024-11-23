// Radix UI components
import * as Form from "@radix-ui/react-form";
// Components
import InputSelect from "../../Molecules/InputSelect/InputSelect";
// Interfaces
import { FormTagFieldProps } from "../../../types/types";
// Context
import { useGroupsContext } from "../../../providers/GroupsContext";

const FormTagField = (props: FormTagFieldProps) => {
	const groups = useGroupsContext();
	const { form, tag, setTag, disabled } = props;

	return (
		<Form.Field
			name='tag'
			className={"form__field"}>
			{form == "group" && (
				<div className={"form__messages__container"}>
					<Form.Message
						className={"form__messages__container__message"}
						match='valueMissing'>
						This field cannot be empty.
					</Form.Message>
				</div>
			)}
			<div className={"form__input__container"}>
				<Form.Label className={"form__label"}>#Tag</Form.Label>
				<Form.Control asChild>
					<>
						{form == "contact" && (
							<InputSelect
								name='tag'
								valuesGroups={groups}
								value={tag}
								setValue={setTag}
								disabled={disabled}
							/>
						)}
						{form == "group" && (
							<input
								className={"form__input"}
								type='text'
								value={tag}
								onChange={(e) => {
									setTag(e.target.value.trimStart());
								}}
								disabled={disabled}
								placeholder='family'
								required
							/>
						)}
					</>
				</Form.Control>
			</div>
		</Form.Field>
	);
};

export default FormTagField;
