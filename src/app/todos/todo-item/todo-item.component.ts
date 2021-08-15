import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions'
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit  {
  @Input()
  todoParam!: Todo;
  @ViewChild('inputFisico') txtInputFisico : ElementRef
  public loading = false;
  public chkCompletadoField: FormControl = new FormControl;
  public txtInputField: FormControl = new FormControl;

  public editando = false;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {

    this.chkCompletadoField = new FormControl(this.todoParam.completado);
    this.txtInputField =  new FormControl(this.todoParam.texto, Validators.required)
    this.chkCompletadoField.valueChanges.subscribe(valor => {
      this.store.dispatch(actions.toggle({id: this.todoParam.id}))
    })
  }
  editar(){
    this.editando = true;
    //es solo para que lo ponga en event Loop y demore un poco
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, );
  }
  terminarEdicion() {
    this.editando= false;
    this.txtInputField.setValue(this.todoParam.texto)

    if (this.txtInputField.invalid) {return;}
    if(this.txtInputField.value === this.todoParam.texto) {return;}

    this.store.dispatch(actions.editar({
      id: this.todoParam.id,
      texto: this.txtInputField.value,
    }))

  }

  borrar() {
    this.store.dispatch(actions.borrar( {id:  this.todoParam.id}))
  }
}
