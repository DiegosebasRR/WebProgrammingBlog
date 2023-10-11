import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Category from "./pages/Category/Category";
import Home from "./pages/Home/Home";
import Article from "./pages/Article/Article";
import AddArticle from "./pages/AddArticle/AddArticle";
import RenderArticle from "./pages/RenderArticle/RenderArticle";
import Auth from "./pages/Auth/Auth";
import ProtectedRoutes from "./router/ProtectedRoutes";
import Dashboard from "./pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/category/:id",
    element: (
      <Layout>
        <Category />
      </Layout>
    ),
  },
  {
    path: "/article",
    element: (
      <Layout>
        <Article />
      </Layout>
    ),
    children: [
      {
        path: ":id",
        element: <RenderArticle />,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "addArticle/:id",
            element: <AddArticle />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
