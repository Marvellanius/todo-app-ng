import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoRoutingModule} from './todo-routing.module';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoDialogComponent} from './todo-dialog/todo-dialog.component';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from "@angular/material/chips";


@NgModule({
    declarations: [TodoListComponent, TodoDialogComponent],
    imports: [
        CommonModule,
        TodoRoutingModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatInputModule,
        MatAutocompleteModule,
        MatChipsModule,
    ]
})
export class TodoModule {
}
