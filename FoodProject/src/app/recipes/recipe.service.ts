import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  
  private recipes: Recipe[] = [
    new Recipe(
      'Salmon', 
      'The best fish', 
      'https://diethood.com/wp-content/uploads/2018/10/Garlic-Butter-Baked-Salmon-12.jpg',
      [
        new Ingredient('Salmon', 1),
        new Ingredient('Rice', 1)
      ]),
    new Recipe(
      'Pasta', 
      'Good food', 
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-bolognese_2.jpg',
      [
        new Ingredient('Macaroni', 1),
        new Ingredient('Meatballs', 2),
        new Ingredient('Tomato sauce', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(); // returns new array, an exact copy
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}