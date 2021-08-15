import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/todo.model';
import { filtrosValidos } from '../../filter/filter.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  filtroActual : string;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    // this.store.select('todos')
    // .subscribe(todosState => this.todos = todosState)

    this.store.subscribe(state => {
      this.todos = state.todos;
      this.filtroActual = state.filtro;
    })
  }

}
