import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import DashboardPage from '../pages/DashboardPage'
import VideoDetailsPage from '../pages/VideoDetailsPage'
import AddVideoPage from '../pages/AddVideoPage'
import PrivateRoute from './PrivateRoute'

export default function AllRoutes() {
  return (
    <div>
        <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/details/:id" element={<PrivateRoute><VideoDetailsPage /></PrivateRoute>} />
        <Route path="/add-video" element={<PrivateRoute><AddVideoPage /></PrivateRoute>} />
        </Routes>
    </div>
  )
}
