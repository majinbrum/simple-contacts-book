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
			className={"formField"}>
			{form == "group" && (
				<div className={"formMessagesContainer"}>
					<Form.Message
						className={"formMessage"}
						match='valueMissing'>
						This field cannot be empty.
					</Form.Message>
				</div>
			)}
			<div className={form == "contact" ? "formInputContainer formInputSelect" : "formInputContainer"}>
				<Form.Label className={"formLabel"}>#Tag</Form.Label>
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
								className={"input"}
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
