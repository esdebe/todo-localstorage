import { StateStorage } from 'zustand/middleware'
import localforage from 'localforage'
import * as env from '@lib/env'

const instance = localforage.createInstance({
  name: env.storage_name,
})

const storage: StateStorage = {
  setItem: async (name, value) => {
    await instance.setItem(name, value)
  },
  getItem: async (name) => {
    const value = await instance.getItem(name)
    return (value ?? null) as any
  },
  removeItem: async (name) => {
    await instance.removeItem(name)
  },
}

export default storage
