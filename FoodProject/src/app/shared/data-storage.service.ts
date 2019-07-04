import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

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
    return this.http
      .get<Recipe[]>(
        'https://course-recipe-book-aebb9.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {  // map rxjs operator
          return recipes.map(recipe => {  // map a js array method
            return {
              ...recipe, 
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          }); 
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}