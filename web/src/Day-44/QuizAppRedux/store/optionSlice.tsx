import { createSlice } from '@reduxjs/toolkit'
import {questions} from "./questions.tsx";
import type { QuizState } from "../../../utils";

const initialState: QuizState = {
  currentQuestion: 0,
  score: 0,
  selectedOption: null,
  showAnswer: false,
  isFinished: false,
}

export const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    selectQuiz: (state, action) => {
      const isCorrect = action.payload === questions[state.currentQuestion].answer;
        state.selectedOption = action.payload;
        state.showAnswer = true;
        if (isCorrect) state.score += 1;
    },
    nextQuiz: state => {
      const nextIndex = state.currentQuestion + 1;
      if (nextIndex >= questions.length) {
        state.isFinished = true;
      } else {
        state.currentQuestion = nextIndex;
        state.selectedOption = null;
        state.showAnswer = false;
      }
    },
    restartQuiz: state => {
      state.currentQuestion = 0;
      state.score = 0;
      state.selectedOption = null;
      state.showAnswer = false;
      state.isFinished = false;
    }
  }
})

export const { selectQuiz, nextQuiz, restartQuiz } = optionSlice.actions

export default optionSlice.reducer