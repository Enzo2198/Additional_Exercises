import { createRoot } from 'react-dom/client'
import './index.css'
import Product from './Day-31/Product'
// import Employee from './pages/Employee'
// import Colors from './pages/Colors'
// import TodoList from "./pages/TodoList"
// import QuizApp from './pages/QuizApp'
import QuizAppRedux from './Day-44/QuizAppRedux'
// import Components from "./homeworks/Day-30/Components";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";


const router = createBrowserRouter([
  // {
  //   path: "/colors",
  //   element: <Colors></Colors>,
  // },
  {
    path: "/product",
    element: <Product></Product>,
  },
  // {
  //   path: "/employee",
  //   element: <Employee/>,
  // },
  // {
  //   path: "/list",
  //   element: <TodoList/>,
  // },
  // {
  //   path: "/quizApp",
  //   element: <QuizApp/>,
  // },
  {
    path: "/quizAppRedux",
    element: <QuizAppRedux/>,
  },
  // {
  //   path: "/day30",
  //   element: <Components/>,
  // },


]);


const root = document.getElementById("root");

createRoot(root!).render(
  <RouterProvider router={router} />
)
