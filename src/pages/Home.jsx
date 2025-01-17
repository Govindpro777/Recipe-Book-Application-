import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getRandomRecipes, searchRecipes } from '../api';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: recipes, isLoading, error } = useQuery(
    ['recipes', searchQuery],
    () => searchQuery ? searchRecipes(searchQuery) : getRandomRecipes(),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading recipes. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Discover Delicious Recipes
        </h1>
        <SearchBar onSearch={setSearchQuery} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes?.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}