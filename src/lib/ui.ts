import create, { StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type States = {
  form: boolean
  type: 'edit' | 'create' | null
  data: any
}

export const initialState: States = {
  form: false,
  type: null,
  data: null,
}

export type Actions = {
  createForm: () => void
  editForm: (data: any) => void
  closeForm: () => void
}

export type UisStore = States & Actions

export type Initializer = StateCreator<UisStore, [['zustand/immer', never]]>

export const uisStore: Initializer = (set) => {
  return {
    ...initialState,
    createForm: () =>
      set((draft: States) => {
        const nextState = draft
        nextState.form = true
        nextState.type = 'create'
        nextState.data = null
      }),
    editForm: (data) =>
      set((draft: States) => {
        const nextState = draft
        nextState.form = true
        nextState.type = 'edit'
        nextState.data = data
      }),
    closeForm: () => set(initialState),
  }
}

export const useUisStore = create<UisStore>()(immer(uisStore))
