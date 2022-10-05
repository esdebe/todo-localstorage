import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTodo, todoPriority, useTodosStore, initialState } from '@lib/todos'

describe('Todo', () => {
  beforeEach(async () => {
    act(() => useTodosStore.setState(initialState))
  })

  it('Initial Todo Is Empty Array', async () => {
    const { result } = renderHook(() => useTodo())
    const { todos } = result.current
    expect(todos).toEqual([])
  })

  it('It Can Add One Todo', async () => {
    const { result, rerender } = renderHook(() => useTodo())
    act(() => result.current.addTodo({ title: 'title', priority: todoPriority.high }))
    rerender()
    expect(result.current.todos[0].title).toEqual('title')
    expect(result.current.todos[0].priority).toEqual(todoPriority.high)
    expect(result.current.todos.length).toEqual(1)
  })

  it('It Can Delete Todo', async () => {
    const { result, rerender } = renderHook(() => useTodo())
    act(() => result.current.addTodo({ title: 'title', priority: todoPriority.high }))
    rerender()
    expect(result.current.todos.length).toEqual(1)
    act(() => result.current.removeTodo(result.current.todos[0].id))
    rerender()
  })

  it('It Can Complete Todo', async () => {
    const { result, rerender } = renderHook(() => useTodo())
    act(() => result.current.addTodo({ title: 'title', priority: todoPriority.high }))
    rerender()
    expect(result.current.todos[0].complete).toEqual(false)
    act(() => result.current.updateTodo({ id: result.current.todos[0].id, complete: true }))
    rerender()
    expect(result.current.todos[0].complete).toEqual(true)
  })

  it('It Can Remove Completed Todo', async () => {
    const { result, rerender } = renderHook(() => useTodo())
    act(() => result.current.addTodo({ title: 'title', priority: todoPriority.high }))
    rerender()
    expect(result.current.todos[0].complete).toEqual(false)
    act(() => result.current.updateTodo({ id: result.current.todos[0].id, complete: true }))
    rerender()
    expect(result.current.todos[0].complete).toEqual(true)
    act(() => result.current.removeCompletedTodo())
    rerender()
    expect(result.current.todos.length).toEqual(0)
  })
})
