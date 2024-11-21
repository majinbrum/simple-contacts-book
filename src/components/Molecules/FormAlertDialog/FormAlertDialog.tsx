// CSS
import style from "./FormAlertDialog.module.css";
// Interfaces
import { FormAlertDialogProps } from "../../../types/types";
// Radix UI component
import * as AlertDialog from "@radix-ui/react-alert-dialog";
// Components
import Button from "../../Atoms/Button/Button";

const FormAlertDialog = (props: FormAlertDialogProps) => {
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
				<AlertDialog.Overlay className={style.alertDialogOverlay} />
				<AlertDialog.Content className={style.alertDialogContent}>
					<AlertDialog.Title className={style.alertDialogTitle}>{alertTitle}</AlertDialog.Title>
					<AlertDialog.Description className={style.alertDialogDescription}>{alertDescription}</AlertDialog.Description>
					<div className={style.alertButtons}>
						<AlertDialog.Cancel asChild>
							<Button
								type='button'
								label='Cancel'
								className={style.alertButtonSecondary}
							/>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<Button
								type='button'
								label={actionButtonLabel}
								className={style.alertButtonPrimary}
								onClick={actionButtonFunction}
							/>
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default FormAlertDialog;
