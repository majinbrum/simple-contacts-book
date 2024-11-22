import { Dispatch, FormEvent, ReactElement, ReactNode, SetStateAction } from "react";
import { IContact, IGroup } from "./databaseTypes";

export interface IValue {
	label: string;
	icon: JSX.Element;
}

export interface IValuesObject {
	[key: string]: IValue;
}

export interface InputSelectProps {
	label?: string;
	name: string;
	valuesObject?: IValuesObject;
	valuesGroups?: IGroup[];
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	disabled?: boolean;
}

export interface InputTextProps {
	name: string;
	placeholder: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	icon?: ReactElement;
}

export interface FormTextFieldsProps {
	editMode: boolean;
	formFields: {
		name: string;
		label: string;
		value: string;
		setValue: Dispatch<SetStateAction<string>>;
		type: string;
		placeholder: string;
		pattern?: string;
	}[];
	disabled: boolean;
}

export interface FormActionsProps {
	editMode: boolean;
	handleReset: () => void;
	submitContact?: (e: FormEvent) => Promise<void>;
	submitGroup?: (e: FormEvent) => Promise<void>;
	id: string;
	enterEditMode: (e: FormEvent) => void;
	setEditMode: Dispatch<SetStateAction<boolean>>;
	setError: Dispatch<SetStateAction<string | undefined>>;
}

export interface ContactsListProps {
	contacts: IContact[];
	title: string;
	listType: string;
	order?: string;
}

export interface ContactCardProps {
	contact: IContact;
	listType: string;
}

export interface FormAlertDialogProps {
	triggerLabel: string;
	alertTitle: string;
	alertDescription: string;
	actionButtonLabel: string;
	actionButtonFunction: () => void;
}

export interface ButtonProps {
	type: "submit" | "reset" | "button";
	onClick?: ((e: FormEvent) => Promise<void>) | (() => void) | ((e: FormEvent) => void);
	label: string | ReactNode;
	className?: string;
	disabled?: boolean;
}

export interface IContactToCreate {
	avatar: string;
	favourite: boolean;
}

export interface ContactDetailsProps {
	contact: IContact;
}

export interface GroupDetailsProps {
	group: IGroup;
}

export interface IFilteredContacts {
	[key: string]: IContact[];
}

export interface ErrorBoxProps {
	message: string;
}
