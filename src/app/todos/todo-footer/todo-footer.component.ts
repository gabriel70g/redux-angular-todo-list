import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../../filter/filter.actions';
import { completedClear } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent implements OnInit {
  filtroActual = 'todos';
  filtros: actions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  pendientes= 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store
    //   .select('filtro')
    //   .subscribe((filtro) => (this.filtroActual = filtro));

    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo =>  !todo.completado).length;
    })
  }

  aplicarFiltro(filtro: actions.filtrosValidos) {
    this.store.dispatch(actions.SetFiltro({ filtro }));
  }

  limpiarCompletados() {
    this.store.dispatch(completedClear())
  }
}
