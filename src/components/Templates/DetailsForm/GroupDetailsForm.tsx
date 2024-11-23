// CSS
import "./DetailsForm.css";
// React
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
// Radix UI components
import * as Form from "@radix-ui/react-form";
// Interfaces
import { GroupDetailsProps } from "../../../types/types";
// Supabase
import { supabaseUrl } from "../../../../supabase/supabaseClient";
import { createGroup, updateGroupById } from "../../../../supabase/groupsFunctions";
import { generateRandomAvatar } from "../../../../supabase/functions";
// Components
import Loader from "../../Atoms/Loader/Loader";
import ErrorBox from "../../Atoms/ErrorBox/ErrorBox";
import FormActions from "../../Organisms/FormActions/FormActions";
// Assets
import FormAvatarField from "../../Molecules/FormAvatarField/FormAvatarField";
import FormTagField from "../../Organisms/FormTagField/FormTagField";

function GroupDetailsForm(props: GroupDetailsProps) {
	const { group } = props;
	const navigate = useNavigate();

	const [newGroup, setNewGroup] = useState(group);

	const [avatar, setAvatar] = useState(newGroup.avatar);
	const [tag, setTag] = useState(newGroup.tag);

	const [editMode, setEditMode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>();

	const enterEditMode = (e: FormEvent) => {
		e.preventDefault();
		setEditMode(true);
	};

	const handleReset = () => {
		setAvatar(newGroup.avatar);
		setTag(newGroup.tag);
		setEditMode(false);
		console.log("reset");
	};

	const generateNewAvatar = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const newAvatarPath = await generateRandomAvatar(newGroup.avatar);
			setAvatar(newAvatarPath);
		} catch (error: any) {
			setError(error.message);
		}
	};

	const validateForm = (e: FormEvent) => {
		const target = e.target as HTMLElement;
		const form = target.closest("form");
		if (form?.checkValidity()) {
			return true;
		} else {
			return false;
		}
	};

	const submitGroup = async (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		if (validateForm(e)) {
			const tempNewGroup = { ...group, avatar, tag };
			setNewGroup(tempNewGroup);
			try {
				if (group.id) {
					const data = await updateGroupById(group.id, tempNewGroup);
					console.log(data);
				} else {
					const data = await createGroup(tempNewGroup);
					console.log(data);
				}
			} catch (error: any) {
				setError(error.message);
			} finally {
				setEditMode(false);
				setIsLoading(false);
				!group.id && navigate("/");
			}
		} else {
			setIsLoading(false);
		}
	};

	if (error) return <ErrorBox message={error} />;
	if (isLoading) return <Loader />;

	return (
		<>
			<Form.Root className={"form"}>
				<div className={"form__avatar"}>
					<img
						src={`${supabaseUrl}/storage/v1/object/public/avatars/${avatar}`}
						alt={`${tag} Avatar`}
						loading='lazy'
					/>
				</div>
				<FormAvatarField
					onClick={(e) => generateNewAvatar(e)}
					disabled={!!group.id && !editMode}
				/>
				<FormTagField
					form='group'
					tag={tag}
					setTag={setTag}
					disabled={!!group.id && !editMode}
				/>
				<FormActions
					editMode={editMode}
					handleReset={handleReset}
					submitGroup={submitGroup}
					id={group.id}
					enterEditMode={enterEditMode}
					setEditMode={setEditMode}
					setError={setError}
				/>
			</Form.Root>
		</>
	);
}

export default GroupDetailsForm;
