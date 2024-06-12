export const makeRequest = async <T>(url: string, options: RequestInit): Promise<T> => { 
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
    throw error;
  }
}