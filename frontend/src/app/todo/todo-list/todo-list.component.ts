import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Todo} from '../todo.model';
import {TodoService} from '../todo.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public getTodos$;
    public getCategories$;
    public todos: Todo[];
    public categories: string[];
    private showDialog = false;
    private dialogOkText = 'Create task';
    private editingTodo: Todo = null;
    private titleValue = '';
    private categoryValue = '';
    private todosFiltered: Todo[] = [];
    private filterType: string;

    constructor(
        private service: TodoService,
    ) {
    }

    ngOnInit() {
        this.subscriptions.push(
            this.subscribeToTodos(),
            this.subscribeToCategories(),
        );

        // Since this is only a single page and component won't ever be destroyed by the app itself;
        // Listen for a page refresh or page shutdown -> THEN call ngOnDestroy() to persist Todos.
        window.onbeforeunload = () => this.ngOnDestroy();
    }

    subscribeToTodos(): Subscription {
        this.getTodos$ = this.service.getTodos$();
        return this.getTodos$.subscribe((data: Todo[]) => {
            this.todos = data;
        });
    }

    subscribeToCategories() {
        this.getCategories$ = this.service.getCategories$();
        return this.getCategories$.subscribe(data => {
            this.categories = data.filter((value, index, self) => self.indexOf(value) === index);
        });
    }

    updateOrAddTodo(todo = null) {
        this.dialogOkText = 'Create task';
        this.titleValue = '';
        this.categoryValue = '';
        this.editingTodo = todo;
        if (todo) {
            this.titleValue = todo.title;
            this.categoryValue = todo.category;
            this.dialogOkText = 'Edit task';
        }
        this.showDialog = true;
    }

    saveTodo(value) {
        if (value) {
            const title = value.title.trim();
            const category = value.category;
            if (this.editingTodo) {
                this.editTodo(title, category);
            } else {
                this.addTodo(title, category);
            }
            if (category.toLowerCase().includes(category)) {
                this.categories.push(category);
            }
        }
        this.hideDialog();
    }

    addTodo(title: string, category: string) {
        const todo = {title, category, id: null, completed: false};
        this.todos.push(todo);
    }

    editTodo(title: string, category: string) {
        this.editingTodo.title = title;
        this.editingTodo.category = category;
    }

    deleteTodo(index) {
        this.todos.splice(index, 1);
    }

    filterByCategory(category: string) {
        this.todosFiltered = this.todos.filter(todo => todo.category === category);
        this.filterType = category;
    }

    filterByCompletion(completed: boolean) {
        this.todosFiltered = this.todos.filter(todo => todo.completed === completed);
        this.filterType = '' + completed;
    }

    clearFilter() {
        this.todosFiltered.splice(0, this.todosFiltered.length);
        this.filterType = null;
    }

    // Only send new todos and changed todos to the server for persisting
    persistTodoChanges() {
        return this.service.updateTodoBatch$(this.todos);
    }

    hideDialog() {
        this.editingTodo = null;
        this.titleValue = null;
        this.categoryValue = null;
        this.showDialog = false;
    }

    ngOnDestroy() {
        this.persistTodoChanges().subscribe(data => {
            this.todos = data;
            this.subscriptions.forEach(s => s.unsubscribe());
        });
    }
}
