import { Toaster } from "react-hot-toast"
import { Navigate, Route, Routes } from "react-router"
import PageLader from "./components/PageLoader"
import useAuthUser from "./hooks/useAuthuser"
import CallPage from "./pages/CallPage"
import ChatPage from "./pages/ChatPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import NotificationPage from "./pages/NotificationPage"
import RegisterPage from "./pages/RegisterPage"

const App = () => {
  // use tandstack query
 
 const {isLoading, authUser} = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnBoarded = authUser?.isOnboarded;
  if(isLoading) return <PageLader/>
  return (
    <div className="h-screen " data-theme="night">

      <Routes>
        <Route path="/" element={isAuthenticated && isOnBoarded ?( <HomePage />) :( <Navigate to={ !isAuthenticated?'/login': "/onboarding"} />)} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to={'/'} />} />
        <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to={'/login'} />} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to={'/login'} />} />
        <Route path="/notification" element={isAuthenticated ? <NotificationPage /> : <Navigate to={'/login'} />} />
         <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnBoarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  )

}


export default App