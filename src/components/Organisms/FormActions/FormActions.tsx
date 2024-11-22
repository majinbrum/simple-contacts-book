// React
import { useNavigate } from "react-router-dom";
// Radix UI components
import * as Form from "@radix-ui/react-form";
// Interfaces
import { FormActionsProps } from "../../../types/types";
// Components
import Button from "../../Atoms/Button/Button";
import FormAlertDialog from "../../Molecules/FormAlertDialog/FormAlertDialog";
// Supabase
import { deleteContactById } from "../../../../supabase/contactsFunctions";
import { deleteGroupById } from "../../../../supabase/groupsFunctions";

const FormActions = (props: FormActionsProps) => {
	const navigate = useNavigate();
	const { editMode, handleReset, submitContact, submitGroup, id, enterEditMode, setEditMode, setError } = props;

	const submit = submitContact || submitGroup;

	const deleteContactOrGroup = async () => {
		try {
			setEditMode(false);
			if (submitContact) {
				const data = await deleteContactById(id);
				console.log(data);
			}
			if (submitGroup) {
				const data = await deleteGroupById(id);
				console.log(data);
			}
		} catch (error: any) {
			setError(error.message);
		} finally {
			navigate("/");
		}
	};

	const formAlertDialogInfo = submitContact
		? {
				triggerLabel: !id ? "Cancel" : "Delete",
				alertTitle: !id ? "Do you want to cancel this action?" : "Do you want to delete this contact?",
				alertDescription: "This action cannot be undone. Are you sure you want to delete these informations permanently?",
				actionButtonLabel: !id ? "Yes, cancel" : "Yes, delete contact",
				actionButtonFunction: !id ? () => navigate("/") : deleteContactOrGroup,
		  }
		: {
				triggerLabel: !id ? "Cancel" : "Delete",
				alertTitle: !id ? "Do you want to cancel this action?" : "Do you want to delete this group?",
				alertDescription: "This action cannot be undone. The contacts related to this group will lost their relationship to it.",
				actionButtonLabel: !id ? "Yes, cancel" : "Yes, delete group",
				actionButtonFunction: !id ? () => navigate("/") : deleteContactOrGroup,
		  };

	if (!submit) return;
	return (
		<div className={"formButtons"}>
			{editMode ? (
				<>
					<Button
						type='button'
						onClick={handleReset}
						label='Cancel'
					/>
					<Form.Submit asChild>
						<Button
							type='submit'
							className={"editPrimaryButton"}
							onClick={(e) => submit(e)}
							label='Save'
						/>
					</Form.Submit>
				</>
			) : (
				<>
					<FormAlertDialog
						triggerLabel={formAlertDialogInfo.triggerLabel}
						alertTitle={formAlertDialogInfo.alertTitle}
						alertDescription={formAlertDialogInfo.alertDescription}
						actionButtonLabel={formAlertDialogInfo.actionButtonLabel}
						actionButtonFunction={formAlertDialogInfo.actionButtonFunction}
					/>
					<Form.Submit asChild>
						<Button
							type={!id ? "submit" : "button"}
							className={"formPrimaryButton"}
							onClick={(e) => (!id ? submit(e) : enterEditMode(e))}
							label={!id ? "Create" : "Edit"}
						/>
					</Form.Submit>
				</>
			)}
		</div>
	);
};

export default FormActions;
