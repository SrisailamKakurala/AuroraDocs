import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import { Fragment } from "react";

// Import page components
import SingleDocChat from "@/pages/SingleDocChat";
import MultiDocChat from "@/pages/MultiDocChat";
import NotesGenerator from "@/pages/NotesGenerator";
import MindmapGenerator from "@/pages/MindmapGenerator";
import QuestionGenerator from "@/pages/QuestionGenerator";
import FlashcardGenerator from "@/pages/FlashcardGenerator";
import TranslateNotes from "@/pages/TranslateNotes";
import LessonPlanGenerator from "@/pages/LessonPlanGenerator";
import Profile from "@/pages/Profile";

// Auth Guard Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuth') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default function App() {
  // For testing: Uncomment the following lines to set/remove auth status
  // localStorage.setItem('isAuth', 'true');  // Set authenticated
  // localStorage.removeItem('isAuth');        // Remove auth
  
  return (
    <Fragment>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<SingleDocChat />} />
          <Route path="/multi-doc" element={<MultiDocChat />} />
          <Route path="/notes" element={<NotesGenerator />} />
          <Route path="/mindmap" element={<MindmapGenerator />} />
          <Route path="/questions" element={<QuestionGenerator />} />
          <Route path="/flashcards" element={<FlashcardGenerator />} />
          <Route path="/translate" element={<TranslateNotes />} />
          <Route path="/lesson-plan" element={<LessonPlanGenerator />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Catch all redirect to signin */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
    </Fragment>
  );
}
