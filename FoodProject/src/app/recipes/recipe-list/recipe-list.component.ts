import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Salmon', 
      'The best fish', 
      'https://diethood.com/wp-content/uploads/2018/10/Garlic-Butter-Baked-Salmon-12.jpg'),
    new Recipe(
      'Pasta', 
      'Good food', 
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-bolognese_2.jpg')
    ];

  constructor() { }

  ngOnInit() {
  }

}
