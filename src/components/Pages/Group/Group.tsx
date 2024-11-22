// CSS
import style from "./Group.module.css";
// React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Interfaces
import { IGroup } from "../../../types/databaseTypes";
// Components
import Loader from "../../Atoms/Loader/Loader";
import GroupDetailsForm from "../../Templates/DetailsForm/GroupDetailsForm";
import ErrorBox from "../../Molecules/ErrorBox/ErrorBox";
// Supabase
import { readGroupById } from "../../../../supabase/groupsFunctions";

const defaultGroup = {
	avatar: "avatars/avatar1.png",
};

const Group = () => {
	const { id } = useParams();
	const [group, setGroup] = useState<IGroup | null>(null);
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

	if (error) return <ErrorBox message={error} />;
	if (isLoading || !group) return <Loader />;

	return (
		<div className={style.contactContainer}>
			<GroupDetailsForm group={group} />
		</div>
	);
};

export default Group;
