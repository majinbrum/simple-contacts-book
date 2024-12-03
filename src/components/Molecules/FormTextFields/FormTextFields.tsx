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
					className={"form__field"}>
					{editMode && (
						<div className={"form__messages__container"}>
							<Form.Message
								className={"form__messages__container__message"}
								match='valueMissing'>
								This field cannot be empty.
							</Form.Message>
							<Form.Message
								className={"form__messages__container__message"}
								match={"typeMismatch"}>
								Please provide a valid email.
							</Form.Message>
							<Form.Message
								className={"form__messages__container__message"}
								match={"patternMismatch"}>
								The phone number can only contain numbers and symbols.
							</Form.Message>
						</div>
					)}
					<div className={"form__input__container"}>
						<Form.Label className={"form__label"}>{field.label}</Form.Label>
						<div className={"form__control"}>
							<Form.Control asChild>
								<input
									className={"form__input"}
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
									className={`form__button--extra ${editMode && "form__button--extra--disabled"}`}
									onClick={() => navigator.clipboard.writeText(field.value)}
									disabled={editMode}
								/>
							)}
							{field.name == "email" && (
								<a
									href={`mailto:${field.value}`}
									target='_blank'
									className={`form__button--extra ${editMode && "form__button--extra--disabled"}`}>
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
