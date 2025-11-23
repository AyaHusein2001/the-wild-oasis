import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createEditCabin(cabin, id) {
  console.log("🚀 ~ createEditCabin ~ cabin:", cabin);
  const hasImagePath = cabin?.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  //1. Create the cabin

  if (!id) {
    query = query.insert([{ ...cabin, image: imagePath }]); // it will work as the form fields names are exactly the same as the fields in the table
  }
  if (id) {
    query = query.update({ ...cabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();
  console.log("🚀 ~ createEditCabin ~ data:", data);
  //2. Upload the cabin image
  if (hasImagePath) return data;
  
  const { storageError } = await supabase.storage
    .from("cabin-images") //storage name
    .upload(imageName, cabin.image); //first is the img name , 2nd is the file

  //3.delete the cabin if there was an error creating the corresponding image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(error);
    throw new Error(
      "Cabin Image could not be uploaded and the cabin could not be created"
    );
  }

  return data;
}
