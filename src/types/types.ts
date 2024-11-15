import { Dispatch, FormEvent, ReactElement, ReactNode, SetStateAction } from "react";
import { IContact } from "./databaseTypes";

export interface IValue {
	label: string;
	icon: JSX.Element;
}

export interface IValuesObject {
	[key: string]: IValue;
}

export interface InputSelectProps {
	label: string;
	name: string;
	valuesObject: IValuesObject;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}

export interface InputTextProps {
	name: string;
	placeholder: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	icon?: ReactElement;
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

export interface IFilteredContacts {
	[key: string]: IContact[];
}
