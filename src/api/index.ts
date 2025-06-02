export const getMenu = async (lang: string = 'en') => {
  const url = `https://intense-tundra-45319.herokuapp.com/api/v3/meals?language=${lang}&per_page=50&meals_for=web`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
};
