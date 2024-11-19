import { useParams } from "react-router-dom";
import style from "./Group.module.css";
import { useEffect, useState } from "react";
import { IGroup } from "../../../types/databaseTypes";
import Loader from "../../Atoms/Loader/Loader";
import GroupDetailsForm from "../../Templates/ContactDetailsForm/GroupDetailsForm";
import { readGroupById } from "../../../../supabase/groupsFunctions";

const defaultGroup = {
	avatar: "avatars/avatar1.png",
};

const Group = () => {
	const { id } = useParams();
	const [group, setGroup] = useState<IGroup>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (id) {
			const getGroupById = async () => {
				setIsLoading(true);
				const data = await readGroupById(id);
				setGroup(data);
				setIsLoading(false);
			};
			getGroupById();
		} else {
			setGroup(defaultGroup as IGroup);
		}
	}, []);

	if (isLoading || !group) return <Loader />;

	return (
		<div className={style.contactContainer}>
			<GroupDetailsForm group={group} />
		</div>
	);
};

export default Group;
