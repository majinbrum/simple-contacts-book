// Radix UI components
import * as Form from "@radix-ui/react-form";
// Components
import Button from "../../Atoms/Button/Button";
// Assets
import { CopyIcon, EnvelopeIcon } from "../../../assets/icons";
import { FormTextFieldsProps } from "../../../types/types";

const FormTextFields = (props: FormTextFieldsProps) => {
	const { editMode, formFields, disabled } = props;

	return (
		<>
			{formFields.map((field, i) => (
				<Form.Field
					key={i}
					name={field.name}
					className={"formField"}>
					{editMode && (
						<div className={"formMessagesContainer"}>
							<Form.Message
								className={"formMessage"}
								match='valueMissing'>
								This field cannot be empty.
							</Form.Message>
							<Form.Message
								className={"formMessage"}
								match={"typeMismatch"}>
								Please provide a valid email.
							</Form.Message>
							<Form.Message
								className={"formMessage"}
								match={"patternMismatch"}>
								The phone number can only contain numbers and symbols.
							</Form.Message>
						</div>
					)}
					<div className={"formInputContainer"}>
						<Form.Label className={"formLabel"}>{field.label}</Form.Label>
						<div className={"formControl"}>
							<Form.Control asChild>
								<input
									className={"input"}
									type={field.type}
									value={field.value == null ? "" : field.value}
									onChange={(e) => {
										field.setValue(e.target.value.trimStart());
									}}
									pattern={field.pattern}
									disabled={disabled}
									placeholder={field.placeholder}
									required
								/>
							</Form.Control>
							{field.name == "phone" && (
								<Button
									type='button'
									label={CopyIcon}
									className={"buttonLink"}
									onClick={() => navigator.clipboard.writeText(field.value)}
									disabled={editMode}
								/>
							)}
							{field.name == "email" && (
								<a
									href={`mailto:${field.value}`}
									target='_blank'
									className={`buttonLink ${editMode && "buttonLinkDisabled"}`}>
									{EnvelopeIcon}
								</a>
							)}
						</div>
					</div>
				</Form.Field>
			))}
		</>
	);
};

export default FormTextFields;
