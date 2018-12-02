//@flow
import shortid from 'shortid'

import type {
  payloadType,
  BoardCreateAction,
  ListCreateAction,
  ListItemCreateAction,
  ListItemMoveAction
} from './actionTypes.js'

export const createBoard = (name: string): BoardCreateAction => ({
  type: 'BOARD_CREATE',
  name,
  id: shortid.generate()
})

export const createList = (name: string, boardId: string): ListCreateAction => ({
  type: 'LIST_CREATE',
  boardId,
  name,
  id: shortid.generate()
})

export const createListItem = (task: string, boardId: string, listId: string): ListItemCreateAction => ({
  type: 'LIST_ITEM_CREATE',
  boardId,
  listId,
  task,
  id: shortid.generate()
})

export const moveListItem = (payload: payloadType, boardId: string): ListItemMoveAction => ({
  type: 'LIST_ITEM_MOVE',
  boardId,
  payload
})