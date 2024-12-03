// CSS
import "./Alert.css";
// Interfaces
import { AlertProps } from "../../../types/types";
// Radix UI component
import * as AlertDialog from "@radix-ui/react-alert-dialog";
// Components
import Button from "../../Atoms/Button/Button";

const Alert = (props: AlertProps) => {
	const { triggerLabel, alertTitle, alertDescription, actionButtonLabel, actionButtonFunction } = props;

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>
				<Button
					type='button'
					label={triggerLabel}
				/>
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className={"alert__overlay"} />
				<AlertDialog.Content className={"alert__content"}>
					<AlertDialog.Title className={"alert__content__title"}>{alertTitle}</AlertDialog.Title>
					<AlertDialog.Description className={"alert__content__description"}>{alertDescription}</AlertDialog.Description>
					<div className={"alert__content__buttons"}>
						<AlertDialog.Cancel asChild>
							<Button
								type='button'
								label='Cancel'
							/>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<Button
								type='button'
								label={actionButtonLabel}
								className={"alert__content__buttons--primary"}
								onClick={actionButtonFunction}
							/>
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default Alert;
