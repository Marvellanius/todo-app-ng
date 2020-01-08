import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from './todo.model';
import {environment} from '../../environments/environment';
import {filter, map, share, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(
        private http: HttpClient,
    ) {
    }

    getTodos$(): Observable<Todo[] | null> {
        return this.http.get(environment.apiUrl + '/todos').pipe(
            share(),
        ) as any;
    }

    getCategories$(): Observable<string[]> {
        return this.getTodos$().pipe(
            map((todos: Todo[]) => {
                return todos.map(todo => todo.category);
            }),
            share()
        );
    }

    updateTodoBatch$(todos: Todo[]) {
        return this.http.post(environment.apiUrl + '/todos/batch', todos) as Observable<Todo[]>;
    }
}
