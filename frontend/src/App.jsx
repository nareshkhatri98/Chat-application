import { useQuery } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import { Navigate, Route, Routes } from "react-router"
import { axiosInstance } from "./lib/axios"
import CallPage from "./pages/CallPage"
import ChatPage from "./pages/ChatPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import NotificationPage from "./pages/NotificationPage"
import OnBoardingPage from "./pages/OnBoardingPage"
import RegisterPage from "./pages/RegisterPage"

const App = () => {
  // use tandstack query
  const { data: authData } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      const data = res.json();
      return data;
    },
    retry: false
  })
  const authUser = authData?.user;
  console.log(authUser);
  return (
    <div className="h-screen " data-theme="night">

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path="/register" element={!authUser ? <RegisterPage /> : <Navigate to={'/'} />} />
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to={'/login'} />} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to={'/login'} />} />
        <Route path="/notification" element={authUser ? <NotificationPage /> : <Navigate to={'/login'} />} />
        <Route path="/onboarding" element={authUser ? <OnBoardingPage /> : <Navigate to={'/login'} />} />
      </Routes>
      <Toaster />
    </div>
  )

}


export default App