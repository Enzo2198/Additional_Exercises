import { useSelector, useDispatch } from "react-redux";
import { questions } from "./questions.tsx";
import { Button, Box, Typography, Card, CardContent, Stack, Container} from "@mui/material";
import { selectQuiz, nextQuiz, restartQuiz } from "./optionSlice.tsx";
import type {RootState} from "./store.ts";

export default function Quiz() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.option);

  const question = questions[state.currentQuestion];

  const handleSelect = (option: string) => {
    if (!state.showAnswer) {
      dispatch(selectQuiz(option));
    }
  };

  const getOptionColor = (option: string): string => {
    if (!state.showAnswer) {
      return option === state.selectedOption ? "lightblue" : "white";
    }
    if (option === question.answer) return "lightgreen";
    if (option === state.selectedOption) return "salmon";
    return "white";
  };

  return (
    <Container>
      {state.isFinished ? (
        <Box textAlign="center" mt={5}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Kết quả
              </Typography>
              <Typography variant="h6" gutterBottom>
                Bạn đạt {state.score} / {questions.length} điểm
              </Typography>
              <Button variant="contained" onClick={() => dispatch(restartQuiz())}>
                Làm lại
              </Button>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Card sx={{ mt: 5 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Câu {state.currentQuestion + 1}: {question.question}
            </Typography>
            <Stack spacing={1} mt={2}>
              {question.options.map((option) => (
                <Button
                  key={option}
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: getOptionColor(option) }}
                  onClick={() => handleSelect(option)}
                  disabled={state.showAnswer}
                >
                  {option}
                </Button>
              ))}
            </Stack>
            {state.showAnswer && (
              <Box mt={2} textAlign="right">
                <Button variant="contained" onClick={() => dispatch(nextQuiz())}>
                  Câu tiếp theo
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};
