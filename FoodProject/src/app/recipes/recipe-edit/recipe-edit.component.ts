import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null; 
      }
    );
  }
// when the params change: if params has an ['id'] and checking, if it is not null,
// we are checking if it has an id. It will not be indefined if we are in edit mode;
// id will be present. if true and id is undefined ( == null ), we are in new mode.
}
