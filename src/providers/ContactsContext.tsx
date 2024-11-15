import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { IContact } from "../types/databaseTypes";

type ISetContacts = Dispatch<SetStateAction<IContact[]>>;

export const ContactsContext = createContext<IContact[]>([]);
export const SetContactsContext = createContext<ISetContacts>(() => {});

function ContactsProvider({ children }: PropsWithChildren) {
	const [contacts, setContacts] = useState<IContact[]>([]);

	return (
		<ContactsContext.Provider value={contacts}>
			<SetContactsContext.Provider value={setContacts}>{children}</SetContactsContext.Provider>
		</ContactsContext.Provider>
	);
}

export const useContactsContext = () => useContext(ContactsContext);
export const useSetContactsContext = () => useContext(SetContactsContext);

export default ContactsProvider;
