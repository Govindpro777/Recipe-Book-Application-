const API_KEY = 'ee616623b28b454cb0b390266ede3061';
const BASE_URL = 'https://api.spoonacular.com/recipes';

export async function getRandomRecipes() {
  const response = await fetch(
    `${BASE_URL}/random?apiKey=${API_KEY}&number=12`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  const data = await response.json();
  return data.recipes;
}

export async function getRecipeById(id) {
  const response = await fetch(
    `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch recipe details');
  }
  return response.json();
}

export async function searchRecipes(query) {
  const response = await fetch(
    `${BASE_URL}/complexSearch?apiKey=${API_KEY}&query=${query}&addRecipeInformation=true&number=12`
  );
  if (!response.ok) {
    throw new Error('Failed to search recipes');
  }
  const data = await response.json();
  return data.results;
}