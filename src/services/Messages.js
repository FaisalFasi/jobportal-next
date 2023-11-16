"use client";
import supabase from "./Supabase";

// just gets a list of all conversation IDs ( not the actual messages )
export const getAllMyConversations = async () => {
  const session = await supabase.auth.getSession();
  console.log(session.data.session.user.id);
  if (!session) return;

  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("user1_id", session?.data?.session?.user?.id)
    .or(`user2_id`, `eq`, session?.data?.session?.user?.id)
    .order("updated_at", { ascending: false });
  // TODO: join with users table to get the name of the other user

  return { data, error };
};

// gets all the messages for a given conversation ID

export const getMessagesForConversation = async (conversation_id) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversation_id)
    .order("created_at", { ascending: false });

  return { data, error };
};

export const findConversationWithOtherUser = async (other_user_id) => {
  const session = await supabase.auth.getSession();
  if (!session) return;

  const myId = session.data.session.user.id;
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("user1_id", myId)
    .eq("user2_id", other_user_id)
    .or(`user1_id`, `eq`, other_user_id)
    .eq(`user2_id`, `eq`, myId)
    .single();

  if (error) {
    console.log(error);
  }

  if (data.id) {
    // conversation already exists, we can messages for this conversation
    const messages = await getMessagesForConversation(data.id);
    return { conversationId, messages };
  } else {
    // conversation doesn't exist, we need to create it
    const newConversation = await createConversation(other_user_id);

    console.log(newConversation);
    return { conversationId, messages: [] };
  }
};

const createConversation = async (other_user_id) => {
  const session = await supabase.auth.getSession();
  if (!session) return;

  const myId = session.data.session.user.id;
  const { data, error } = await supabase
    .from("conversations")
    .insert([{ user1_id: myId, user2_id: other_user_id }])
    .single();

  if (error) {
    console.log(error);
  }
  console.log(data);

  return data;
};

export const sendMessage = async (conversation_id, message) => {
  const session = await supabase.auth.getSession();
  if (!session) return;

  const myId = session.data.session.user.id;
  const { data, error } = await supabase
    .from("messages")
    .insert([{ conversation_id, user_id: myId, message }])
    .single();

  if (error) {
    console.log(error);
  }
  console.log(data);

  return data;
};
