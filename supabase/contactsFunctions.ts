import { IContact } from "../src/types/databaseTypes";
import { supabase } from "./supabaseClient";

export const readContacts = async (group: string, sortBy = "name", order = "ascending") => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}

	let query = supabase
		.from("contacts_duplicate")
		.select("*")
		.order(sortBy, { ascending: order == "ascending" ? true : false });

	if (group !== "all") {
		query = query.eq("tag", group);
	}

	const { data, error } = await query;
	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const readContactById = async (id: string) => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}

	const { data, error } = await supabase.from("contacts_duplicate").select("*").eq("id", id).single();
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const updateContactById = async (id: string, body: IContact) => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}
	console.log(body);
	const { data, error } = await supabase
		.from("contacts_duplicate")
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

	const { data, error } = await supabase.from("contacts_duplicate").delete().eq("id", id);
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const createContact = async (body: IContact) => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}
	const { data, error } = await supabase.from("contacts_duplicate").insert(body).select().single();
	if (error) {
		throw new Error(error.message);
	}

	return data;
};
