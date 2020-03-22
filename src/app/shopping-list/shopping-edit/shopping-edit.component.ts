import { Subscription } from 'rxjs/Subscription';
import {
  Component,
  OnInit,
  OnDestroy

} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription:Subscription;
  editMode = false;
  editedItemIndex: number;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
   this.subscription = this.slService.startedEditing
    .subscribe((index: number)=>{
      this.editedItemIndex = index;
      this.editMode = true;
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
   }

  onAddItem(form: NgForm) {
    const valaue = form.value;
    const newIngredient = new Ingredient(valaue.name, valaue.amount);
    this.slService.addIngredient(newIngredient);
  }

}
