import { supabase } from "./supabaseClient";

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
