import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

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
  console.log("🚀 ~ getCurrentUser ~ session:", session);
  if (!session.session) {
    return null;
  }
  // it is safer to get the user from supabase again , not the session object
  const { data, error } = await supabase.auth.getUser();
  console.log("🚀 ~ getCurrentUser ~ data:", data);
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  let updateData;
  if (password) {
    updateData = {
      password,
    };
  }
  if (fullName) {
    updateData = {
      data: {
        fullName,
      },
    };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) return data;
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }
  const { data: updatedAvatarData, error: updatedAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updatedAvatarError) {
    throw new Error(updatedAvatarError.message);
  }
  return updatedAvatarData;
}
