// Radix UI components
import * as Form from "@radix-ui/react-form";
import * as Toggle from "@radix-ui/react-toggle";
// Interfaces
import { FormFavouriteFieldProps } from "../../../types/types";
// Assets
import { FilledStarIcon, StarIcon } from "../../../assets/icons";

const FormFavouriteField = (props: FormFavouriteFieldProps) => {
	const { onClick, disabled, favourite } = props;

	return (
		<Form.Field
			name='favourite'
			className={"formField"}>
			<div className={"formInputContainer"}>
				<Form.Label className={"formLabel"}>Favourite</Form.Label>
				<Form.Control asChild>
					<Toggle.Root
						className={"toggle"}
						aria-label='Toggle favourite'
						onClick={onClick}
						disabled={disabled}>
						{favourite ? FilledStarIcon : StarIcon}
					</Toggle.Root>
				</Form.Control>
			</div>
		</Form.Field>
	);
};

export default FormFavouriteField;
