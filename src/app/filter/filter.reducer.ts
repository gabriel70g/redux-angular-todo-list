import { Action, createReducer, on, props, State } from '@ngrx/store';
import { SetFiltro, filtrosValidos } from './filter.actions';

export const initialState = 'todos';

const _filtroReducer = createReducer(
  initialState,
  on(SetFiltro, (state, { filtro }) => {
    return filtro;
  })
);

export function filtroReducer(state: string| undefined, action: Action) {
  return _filtroReducer(state, action);
}
