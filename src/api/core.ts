"use client";

import { toast } from "react-toastify";

export const fetchFromApi = async (endpoint: string, params: Record<string, any> = {}) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}${endpoint}`);
  
  console.log(params);
  

  // Append API key and additional parameters
  url.searchParams.append("api_key", process.env.NEXT_PUBLIC_TMDB_API_KEY || "");
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });


  

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    toast.dismiss(); // Clear the toast once data is fetched
    return data;
  } catch (error) {
    toast.error("Failed to fetch data! Please try again.");
    console.error("API Call Error:", error);
    throw error;
  }
};
