import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import DashboardLayout from "./components/dashboard-layout.jsx";
import LoginPage from "./pages/login.jsx";
import {AuthProvider} from "./contexts/authContext.jsx";
import OverviewPage from "./pages/dashboard/overview.jsx";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage></LoginPage>
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard/overview',
                element: <OverviewPage></OverviewPage>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
  </React.StrictMode>,
)
