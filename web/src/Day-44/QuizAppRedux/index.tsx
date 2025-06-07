import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import {Box, Container, Paper} from "@mui/material";
import Quiz from "../QuizAppRedux/store/QuizRedux.tsx";

export default function QuizAppRedux(){
  return (
    <>
      <Provider store={store}>
          <Box sx={{background: '#B8E2FA', minHeight: '100vh', width: '100vw', overflow: 'hidden'}}>
            <Container maxWidth="md">
              <Box mt={4}>
                <Paper elevation={3} sx={{ padding: 4, background: '#6687C7' }}>
                  <Quiz />
                </Paper>
              </Box>
            </Container>
          </Box>
      </Provider>
    </>
  )
}