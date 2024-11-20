import { useParams } from "react-router-dom";
import style from "./Group.module.css";
import { useEffect, useState } from "react";
import { IGroup } from "../../../types/databaseTypes";
import Loader from "../../Atoms/Loader/Loader";
import GroupDetailsForm from "../../Templates/DetailsForm/GroupDetailsForm";
import { readGroupById } from "../../../../supabase/groupsFunctions";
import ErrorBox from "../../Molecules/ErrorBox/ErrorBox";

const defaultGroup = {
	avatar: "avatars/avatar1.png",
};

const Group = () => {
	const { id } = useParams();
	const [group, setGroup] = useState<IGroup>(defaultGroup as IGroup);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>();

	const getGroupById = async () => {
		if (!id) return;
		try {
			setIsLoading(true);
			const data = await readGroupById(id);
			setGroup(data);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!id) {
			setGroup(defaultGroup as IGroup);
		} else {
			getGroupById();
		}
	}, []);

	if (isLoading || (!group && !error)) return <Loader />;

	if (error) return <ErrorBox message={error} />;

	return (
		<div className={style.contactContainer}>
			<GroupDetailsForm group={group} />
		</div>
	);
};

export default Group;
