import { IValuesObject } from "../types/types";
import { AscendingIcon, DescendingIcon, EnvelopeIcon, LettersIcon } from "./icons";

export const orderData: IValuesObject = {
	ascending: { label: "Ascending", icon: AscendingIcon },
	descending: { label: "Descending", icon: DescendingIcon },
};

export const sortByData: IValuesObject = {
	name: { label: "Name", icon: LettersIcon },
	surname: { label: "Surname", icon: LettersIcon },
	email: { label: "Email", icon: EnvelopeIcon },
};
