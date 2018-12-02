//@flow
import type { Dispatch as ReduxDispatch } from 'redux' 

type DraggableLocation = {|
  droppableId: string,
  index: number,
|}

export type payloadType = {|
  draggableId: string,
  source: DraggableLocation,
  destination: DraggableLocation,
  mode: 'FLUID' | 'SNAP',
  combine: {
    draggableId: string,
    droppableId: string
  },
  reason: 'DROP' | 'CANCEL',
  type: string
|}

export type BoardCreateAction = {
  type: 'BOARD_CREATE',
  name: string,
  id: string
}

export type ListCreateAction = {
  type: 'LIST_CREATE',
  boardId: string,
  name: string,
  id: string
}

export type ListItemCreateAction = {
  type: 'LIST_ITEM_CREATE',
  boardId: string,
  listId: string,
  task: string,
  id: string
}

export type ListItemMoveAction = {
  type: 'LIST_ITEM_MOVE',
  boardId: string,
  payload: payloadType
}

export type ActionType =
  | BoardCreateAction
  | ListCreateAction
  | ListItemCreateAction
  | ListItemMoveAction

export type Dispatch = ReduxDispatch<ActionType>