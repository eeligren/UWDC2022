import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import {AuthProvider} from "./contexts/authContext.jsx";
import OverviewPage from "./pages/dashboard/overview.jsx";
import ProtectedPage from "./components/protected-page.jsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

/*
App router
 */
const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage></LoginPage>
    },
    {
        path: '/',
        element: <Navigate to={'/dashboard/overview'}></Navigate>
    },
    {
        path: '/dashboard',
        element: <ProtectedPage></ProtectedPage>,
        children: [
            {
                path: '/dashboard/overview',
                element: <OverviewPage></OverviewPage>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Navigate to={'/dashboard/overview'}></Navigate>
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
          <DndProvider backend={HTML5Backend}>
            <RouterProvider router={router}></RouterProvider>
          </DndProvider>
      </AuthProvider>
  </React.StrictMode>,
)
