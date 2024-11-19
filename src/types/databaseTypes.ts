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

export type IContact = Database["public"]["Tables"]["contacts_duplicate"]["Row"];
export type IGroup = Database["public"]["Tables"]["groups"]["Row"];
