import { Ingredient } from '../shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Bananas', 3)
  ]
};

export function shoppingListReducer(state = initialState, action) {}