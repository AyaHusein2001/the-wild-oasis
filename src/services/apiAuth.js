import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  console.log("🚀 ~ getCurrentUser ~ session:", session)
  if (!session.session) {
    return null;
  }
  // it is safer to get the user from supabase again , not the session object
  const { data, error } = await supabase.auth.getUser();
  console.log("🚀 ~ getCurrentUser ~ data:", data)
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}
