"use client";
import supabase from "./Supabase";

export const getAllMyConversations = async () => {
  const session = await supabase.auth.getSession();
  console.log(session.data.session.user.id);
  if (!session) return;

  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("user1_id", session?.data?.session?.user?.id)
    .or(`user2_id`, `eq`, session?.data?.session?.user?.id);
  return { data, error };
  // console.log(data, error);
};
