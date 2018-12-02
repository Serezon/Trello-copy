//@flow

export const initialState = {
  boards: [
    {
      name: 'Test Board',
      id: 'abcdefg',
      lists: [
        {
          name: 'Processing',
          id: 'gg35asv',
          itemsOrder: ['ad1331d', 'a839f3g', 'l3jk5b7'],
          items: [
            {
              id: 'ad1331d',
              task: 'Socket.io'
            },
            {
              id: 'a839f3g',
              task: 'Server-side rendering'
            },
            {
              id: 'l3jk5b7',
              task: 'React Drag\'n\'Drop'
            }
          ]
        },
        {
          name: 'Finished',
          id: '7gbh12f',
          itemsOrder: ['9a2a5cp', 'ajki129'],
          items: [
            {
              id: 'ajki129',
              task: 'Styled components'
            },
            {
              id: '9a2a5cp',
              task: 'React&Redux'
            }
          ]
        }
      ]
    }
  ]
}

export type ItemType = {
  id: string,
  task: string
}

export type ListType = {
  name: string,
  id: string,
  itemsOrder: Array<string>,
  items: Array<ItemType>
}

export type BoardType = {
  name: string,
  id: string,
  lists: Array<ListType>
}

export type InitialStateType = {
  +boards: Array<BoardType>
}