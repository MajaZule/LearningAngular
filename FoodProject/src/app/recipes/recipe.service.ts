import { Recipe } from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Salmon', 
      'The best fish', 
      'https://diethood.com/wp-content/uploads/2018/10/Garlic-Butter-Baked-Salmon-12.jpg'),
    new Recipe(
      'Pasta', 
      'Good food', 
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-bolognese_2.jpg')
    ];

  getRecipes() {
    return this.recipes.slice(); // returns new array, an exact copy
  }
}