import { createBrowserRouter } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import UsersPage from "../pages/UsersPage";
import UserFormPage from "../pages/UserFormPage";
import NotFoundPage from "../pages/NotFoundPage";
import PostFormPage from "../pages/PostFormPage";
import PostsPage from "../pages/PostsPage";
import AppLayout from "@/components/layout/AppLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "posts",
        element: <PostsPage />,
      },
      {
        path: "users/new",
        element: <UserFormPage />,
      },
      {
        path: "posts/new",
        element: <PostFormPage />,
      },
      {
        path: "users/:id/edit",
        element: <UserFormPage />,
      },
    ],
  },
]);

export default router;
