import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Salmon', 
  //     'The best fish', 
  //     'https://diethood.com/wp-content/uploads/2018/10/Garlic-Butter-Baked-Salmon-12.jpg',
  //     [
  //       new Ingredient('Salmon', 1),
  //       new Ingredient('Rice', 1)
  //     ]),
  //   new Recipe(
  //     'Pasta', 
  //     'Good food', 
  //     'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-bolognese_2.jpg',
  //     [
  //       new Ingredient('Macaroni', 1),
  //       new Ingredient('Meatballs', 2),
  //       new Ingredient('Tomato sauce', 1)
  //     ])
  // ];

  private recipes: Recipe[] = [];

  constructor(
    private slService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}