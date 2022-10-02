import create, { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import storage from '@lib/storage'
import { immer } from 'zustand/middleware/immer'
import * as env from '@lib/env'
import { nanoid } from 'nanoid'
import isEqual from 'lodash/isEqual'
import { useCallback } from 'react'
import dayjs from 'dayjs'

export const todoPriority = {
  unset: 0,
  high: 1,
  medium: 2,
  low: 3,
} as const

type TodoPriorityKeys = keyof typeof todoPriority

export type TodoPriority = typeof todoPriority[TodoPriorityKeys]

export type Todo = {
  id: string
  title: string
  complete: boolean
  priority: TodoPriority
  created: string
  updated?: string
}

type States = {
  todos: Todo[]
  completed: number
  count: number
  uncompleted: number
  high: number
  low: number
  medium: number
}

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>

export type AddTodoParams = OptionalExceptFor<Pick<Todo, 'title' | 'priority'>, 'title'>

export type UpdateTodoParams = OptionalExceptFor<Todo, 'id'>

type Actions = {
  addTodo: (value: AddTodoParams) => void
  updateTodo: (value: UpdateTodoParams) => void
  removeTodo: (id?: string) => void
  toggleTodo: (id?: string) => void
  removeCompletedTodo: () => void
}

type TodosStore = States & Actions

type Initializer = StateCreator<
  TodosStore,
  [['zustand/persist', unknown], ['zustand/immer', never]]
>

const initialState: States = {
  todos: [],
  completed: 0,
  count: 0,
  uncompleted: 0,
  high: 0,
  low: 0,
  medium: 0,
}

const todoStore: Initializer = (set) => {
  return {
    ...initialState,
    addTodo: (params) =>
      set((draft: States) => {
        draft.todos.unshift({
          complete: false,
          id: nanoid(),
          priority: params.priority ?? todoPriority.low,
          title: params.title,
          created: dayjs().unix().toString(),
        })
      }),
    updateTodo: (params) =>
      set((draft: States) => {
        const nextState = draft
        const index = nextState.todos.findIndex((todo) => todo.id === params.id)
        if (index !== -1) {
          nextState.todos[index].complete = params.complete ?? nextState.todos[index].complete
          nextState.todos[index].title = params.title ?? nextState.todos[index].title
          nextState.todos[index].priority = params.priority ?? nextState.todos[index].priority
          nextState.todos[index].updated = dayjs().unix().toString()
        }
      }),
    toggleTodo: (id) =>
      set((draft: States) => {
        const nextState = draft
        const index = nextState.todos.findIndex((todo) => todo.id === id)
        if (index !== -1) nextState.todos[index].complete = !nextState.todos[index].complete
      }),
    removeTodo: (id) =>
      set((draft: States) => {
        const nextState = draft
        const index = nextState.todos.findIndex((todo) => todo.id === id)
        if (index !== -1) nextState.todos.splice(index, 1)
      }),
    removeCompletedTodo: () =>
      set((draft: States) => {
        const nextState = draft
        const uncompleted = nextState.todos.filter((todo) => !todo.complete)
        nextState.todos = uncompleted
      }),
    clearTodos: () => set(initialState),
  }
}

export const useTodosStore = create<TodosStore>()(
  persist(immer(todoStore), {
    name: env.storage_name,
    getStorage: () => storage,
  })
)

export const useTodo = () => {
  const selector = useCallback((state: TodosStore) => state, [])
  const { addTodo, todos, removeTodo, toggleTodo, removeCompletedTodo, updateTodo } = useTodosStore(
    selector,
    (prev, next) => isEqual(prev.todos, next.todos)
  )

  return {
    addTodo,
    todos,
    removeTodo,
    toggleTodo,
    removeCompletedTodo,
    updateTodo,
  }
}
