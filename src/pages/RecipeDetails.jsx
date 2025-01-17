import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Clock, Users, ChevronLeft } from 'lucide-react';
import { getRecipeById } from '../api';

export default function RecipeDetails() {
  const { id } = useParams();
  
  const { data: recipe, isLoading, error } = useQuery(
    ['recipe', id],
    () => getRecipeById(id)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading recipe details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back to recipes
      </Link>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
      />

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h1>

      <div className="flex items-center space-x-6 mb-6 text-gray-600">
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          <span>{recipe.readyInMinutes} minutes</span>
        </div>
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          <span>{recipe.servings} servings</span>
        </div>
      </div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc pl-5 space-y-2">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.amount} {ingredient.unit} {ingredient.original}
            </li>
          ))}
        </ul>
      </div>

      <div className="prose max-w-none">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      </div>
    </div>
  );
}