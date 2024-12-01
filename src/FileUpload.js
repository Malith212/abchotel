import { useState } from 'react';
import { supabase } from './supabaseClient';

const handleUpload = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `FoodCategory/${fileName}`;

    const { data, error } = await supabase.storage
      .from('restaurant-img')
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    const { data: url, error: urlError } = supabase.storage
      .from('restaurant-img')
      .getPublicUrl(filePath);

    if (urlError) {
      throw urlError;
    }

    console.log("url - ", url.publicUrl);
    return url.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export { handleUpload };
