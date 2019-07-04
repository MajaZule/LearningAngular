import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})      // we have to use it because we are injecting a service into a service
export class DataStorageService {
  
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
    .put(                  // put is a firebase method
      'https://course-recipe-book-aebb9.firebaseio.com/recipes.json', 
      recipes
    )
    .subscribe(response => {
      console.log(response);
    });  
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>('https://course-recipe-book-aebb9.firebaseio.com/recipes.json')
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }
}