import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoService} from "../todo.service";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-todo-dialog',
    templateUrl: './todo-dialog.component.html',
    styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent implements OnInit {

    @Input() value: string;
    @Input() currentCategory: string;
    @Input() categories;
    @Input() showPrompt: boolean;
    @Input() placeholder: string;
    @Input() title: string;
    @Input() template: string;
    @Input() okText: string;
    @Input() cancelText: string;
    @Output() valueEmitted = new EventEmitter<string[]>();

    private filteredCategory;


    constructor() {
        this.okText = 'OK';
        this.cancelText = 'Cancel';
    }

    filterCategory() {
        this.filteredCategory = this.categories.filter(category =>
            // used 'includes' here for demo, you'd want to probably use 'indexOf'
            category.toLowerCase().includes(this.currentCategory));

    }

    ngOnInit() {
    }

    emitValue(value) {
        this.valueEmitted.emit(value);
        this.currentCategory = '';
    }

}
