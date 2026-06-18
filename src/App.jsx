import React from 'react'
import { createRouter, createRoute, createRootRoute, RouterProvider } from '@tanstack/react-router'
import Portfolio from './pages/Portfolio.jsx'

// Root route
const rootRoute = createRootRoute({
  component: () => <Portfolio />,
})

// Index route (single page)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Portfolio,
})

const routeTree = rootRoute.addChildren([indexRoute])

const router = createRouter({ routeTree })

export default function App() {
  return <RouterProvider router={router} />
}
