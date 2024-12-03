import { IGroup } from "../src/types/databaseTypes";
import { supabase } from "./supabaseClient";

export const readGroups = async () => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}

	const { data, error } = await supabase.from("groups").select().order("tag", { ascending: true });
	if (error) {
		throw new Error(error.message);
	} else {
		return data;
	}
};

export const createGroup = async (body: IGroup) => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}
	const { data, error } = await supabase.from("groups").insert(body).select().single();
	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const readGroupById = async (id: string) => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}

	const { data, error } = await supabase.from("groups").select("*").eq("id", id).single();
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const updateGroupById = async (id: string, body: IGroup) => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}
	const { data, error } = await supabase
		.from("groups")
		.update({ ...body })
		.eq("id", id)
		.select();
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const deleteGroupById = async (id: string) => {
	if (!supabase) {
		throw new Error("Supabase client is not initialized.");
	}

	const { data, error } = await supabase.from("groups").delete().eq("id", id);
	if (error) {
		throw new Error(error.message);
	}
	return data;
};
