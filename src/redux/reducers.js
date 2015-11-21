import R from 'ramda';
import Vector from 'immutable-vector2d';

import addingComponentReducer from './reducers/addingComponent.js';
import moveComponentReducer from './reducers/moveComponent.js';
import modesReducer from './reducers/modes.js';
import mainLoopReducer from './reducers/mainLoop.js';
import selectComponentReducer from './reducers/selectComponent.js';
import deleteComponentReducer from './reducers/deleteComponent.js';
import mutateComponentReducer from './reducers/mutateComponent.js';
import toasterReducer from './reducers/toaster.js';
import { createVolts2RGB } from '../utils/volts2RGB.js';

import MODES from '../Modes.js';

import {
  CHANGE_MODE,
  CHANGE_MODE_BY_ID,

  SELECT_HOVERED_COMPONENT,
  UNSELECT_COMPONENT,

  ADDING_START,
  ADDING_MOVED,
  ADDING_FINISH,

  MOVING_START,
  MOVING_MOVED,
  MOVING_FINISH,

  LOOP_BEGIN,
  LOOP_UPDATE,

  MOUSE_MOVED,

  DELETE_COMPONENT,
  CHANGE_COMPONENT_VALUE,

  SHOW_ADD_TOASTER,
  HIDE_ADD_TOASTER
} from './actions.js';

export const initialState = {
  mode: {
    type: MODES.selectOrMove,
    meta: {}
  },

  showAddToaster: false,

  mousePos: {},

  // addingComponent: {
  //   id,
  //   start: coords,
  //   typeID
  // }
  addingComponent: {},

  // movingComponent: {
  //   id,
  //   dragPointIndex: number|false,
  //   from: Vector,
  //   origDragPoints
  // }
  movingComponent: {},

  currentOffset: 0,

  // views: {
  //   id: {
  //     id,
  //     typeID,
  //
  //     dragPoints: [Vector], // 2 drag points
  //     connectors: [Vector],
  //
  //     value, // current|resistance etc.
  //   }
  // }
  views: {},

  // circuitState: {
  //  id: {
  //    currrents
  //    voltages
  //  }
  // }
  circuitState: {},

  // hover: {
  //   viewID,
  //   dragPointIndex: number|false
  // }
  hover: {},

  // currently selected component
  selected: undefined,

  // TODO maxVoltage: 5,
  volts2RGB: createVolts2RGB(5),

  circuitChanged: false,
  error: false // string | false
};

export default function simulatorReducer(state = initialState, action) {
  switch (action.type) {

  case CHANGE_MODE:
  case CHANGE_MODE_BY_ID:
    return modesReducer(state, action);

  case UNSELECT_COMPONENT:
  case SELECT_HOVERED_COMPONENT:
    return selectComponentReducer(state, action);

  case ADDING_START:
  case ADDING_MOVED:
  case ADDING_FINISH:
    return addingComponentReducer(state, action);

  case MOVING_START:
  case MOVING_MOVED:
  case MOVING_FINISH:
    return moveComponentReducer(state, action);

  case LOOP_BEGIN:
  case LOOP_UPDATE:
    return mainLoopReducer(state, action);

  case MOUSE_MOVED:
    return R.assoc('mousePos', Vector.fromObject(action.coords), state);

  case DELETE_COMPONENT:
    return deleteComponentReducer(state, action);

  case CHANGE_COMPONENT_VALUE:
    return mutateComponentReducer(state, action);

  case SHOW_ADD_TOASTER:
  case HIDE_ADD_TOASTER:
    return toasterReducer(state, action);

  default:
    return state;
  }
}
