import { IContact } from "../src/types/databaseTypes";
import { supabase } from "./supabaseClient";

export const readContacts = async (sortBy = "name", order = "ascending") => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}

	const { data, error } = await supabase
		.from("contacts")
		.select("*")
		.order(sortBy, { ascending: order == "ascending" ? true : false });
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const readContactsGroups = async () => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}

	const { data, error } = await supabase.from("contacts").select("tag").order("tag", { ascending: true });
	if (error) {
		throw new Error(error.message);
	} else {
		const tags: string[] = [];
		data?.forEach((item) => {
			if (!tags.includes(item.tag)) {
				tags.push(item.tag);
			}
		});
		return tags;
	}
};

export const readContactById = async (id: string) => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}

	const { data, error } = await supabase.from("contacts").select("*").eq("id", id).single();
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const updateContactById = async (id: string, body: IContact) => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}
	const { data, error } = await supabase
		.from("contacts")
		.update({ ...body })
		.eq("id", id)
		.select();
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const deleteContactById = async (id: string) => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}

	const { data, error } = await supabase.from("contacts").delete().eq("id", id);
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const generateRandomAvatar = async (currentAvatar: string) => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}

	let newAvatar;

	do {
		const { data, error } = await supabase.rpc("get_random_avatar");
		if (error) {
			throw new Error(error.message);
		}
		newAvatar = data;
	} while (newAvatar == currentAvatar);

	return newAvatar;
};

export const createContact = async (body: IContact) => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}
	const { data, error } = await supabase.from("contacts").insert(body).select().single();
	if (error) {
		throw new Error(error.message);
	}

	return data;
};
