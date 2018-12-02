//@flow
import { initialState } from './initialState'
import type {
  ListType,
    BoardType,
    InitialStateType
} from './initialState'

import type {
  payloadType,
  ActionType,
    ListCreateAction,
    ListItemCreateAction,
    ListItemMoveAction
} from '../Actions/actionTypes.js'

const addListToBoard = (state: InitialStateType, action: ListCreateAction) => {
  const boards = [...state.boards]

  const board: void | BoardType = boards.find((board) => board.id === action.boardId)

  if (board) {
    board.lists = [
      ...board.lists,
      {
        name: action.name,
        id: action.id,
        itemsOrder: [],
        items: []
      }
    ]
  }

  return boards
}

const addItemToBoardList = (state: InitialStateType, action: ListItemCreateAction) => {
  const boards = [...state.boards]

  const board: void | BoardType = boards.find((board) => board.id === action.boardId)

  if (board) {
    const list: void | ListType = board.lists.find((list) => list.id === action.listId)

    if (list) {
      list.items = [
        ...list.items,
        {
          id: action.id,
          task: action.task
        }
      ]

      list.itemsOrder = [...list.itemsOrder, action.id]
    }
  }

  return boards
}

const moveListItem = (state: InitialStateType, action: ListItemMoveAction) => {

  const boards = [...state.boards]
  const board: BoardType = { ...boards.splice(boards.findIndex(board => board.id === action.boardId), 1)[0] }
  const payload: payloadType = action.payload

  if (payload.source.droppableId === payload.destination.droppableId) {
    const list: void | ListType = board.lists.find(list => list.id === payload.source.droppableId)

    if (list && payload.destination.index) {
      const itemsOrder = list.itemsOrder

      const movedItem = itemsOrder.splice(payload.source.index, 1)
      itemsOrder.splice(payload.destination.index, 0, movedItem[0])

      boards.push(board)
    }

    return boards
  }

  const sourceList = board.lists.find(list => list.id === payload.source.droppableId)
  const destList = board.lists.find(list => list.id === payload.destination.droppableId)

  if (sourceList && destList) {
    sourceList.itemsOrder.splice(payload.source.index, 1)
    const item = { ...sourceList.items.find(item => item.id === payload.draggableId) }
    sourceList.items.splice(sourceList.items.findIndex(item => item.id === payload.draggableId), 1)

    destList.itemsOrder.splice(payload.destination.index, 0, payload.draggableId)
    destList.items = [
      ...destList.items,
      item
    ]

    boards.push(board)
  }

  return boards
}

const rootReducer = (state: InitialStateType = initialState, action: ActionType) => {
  
  switch (action.type) {

    case 'BOARD_CREATE':
      return {
        ...state,
        boards: [
          ...state.boards,
          {
            name: action.name,
            id: action.id,
            lists: []
          }
        ]
      }

    case 'LIST_CREATE':
      return {
        ...state,
        boards: addListToBoard(state, action)
      }

    case 'LIST_ITEM_CREATE':
      return {
        ...state,
        boards: addItemToBoardList(state, action)
      }

    case 'LIST_ITEM_MOVE':
      return {
        ...state,
        boards: moveListItem(state, action)
      }

    default:
      return state
  }
}

export default rootReducer;