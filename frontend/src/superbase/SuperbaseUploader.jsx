import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;



// const uploadFile = async (file) => {
//   const { data, error } = await supabase.storage
//     .from('inventory_bucket')
//     .upload(`folder_name/${file.name}`, file);

//   if (error) {
//     console.error('Error uploading file:', error);
//     return null;
//   }

//   return data.Key; // Return the path to the uploaded file
// };

// export default uploadFile;
