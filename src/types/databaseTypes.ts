import { Database } from "../../supabase/database.types";

// export interface IContact {
// 	id: number;
// 	name: string;
// 	surname: string;
// 	phone: string;
// 	email: string;
// 	favourite: boolean;
// 	avatar: string;
// tag: string
// }

export type IContact = Database["public"]["Tables"]["contacts"]["Row"];
export type IContactsGroup = Database["public"]["Tables"]["contacts"]["Row"]["tag"];
