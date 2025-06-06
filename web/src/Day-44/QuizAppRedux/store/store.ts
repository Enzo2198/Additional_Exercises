import { configureStore } from '@reduxjs/toolkit'
import optionReducer from './optionSlice.tsx'

export const store = configureStore({
  reducer: {
    option: optionReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;