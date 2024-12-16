
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './auth/forms/Login'
import Register from './auth/forms/Register'
import Home from './root/Pages/Home'
import AuthLayout from './auth/AuthLayout'
import RootLayout from './root/RootLayout'
import { Toaster } from "@/components/ui/toaster"
import AllUsers from './root/Pages/AllUsers'
import CreatePost from './root/Pages/CreatePost'
import EditPost from './root/Pages/EditPost'
import UpdateProfile from './root/Pages/UpdateProfile'
import Saved from './root/Pages/Saved'
import Profile from './root/Pages/Profile'
import PostDetails from './root/Pages/PostDetails'
import LikedPost from './root/Pages/LikedPost'
import Explore from './root/Pages/Explore'



function App() {
 

  return (
    <>
     
      <main className='flex h-screen'>
   
        
        
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout/>}>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>

          </Route>
         

          {/* private routes */}
          <Route element={<RootLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='users' element={<AllUsers/>}/>
          <Route path='create-post' element={<CreatePost/>}/>
          <Route path={`/editpost/:id`} element={<EditPost/>}/>
          <Route path='all-users' element={<AllUsers/>}/>
          <Route path='likedpost' element={<LikedPost/>}/>
          <Route path='/postdetails/:id' element={<PostDetails/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='saved' element={<Saved/>}/>
          <Route path='updateprofile' element={<UpdateProfile/>}/>
          <Route path='explore' element={<Explore/>}/>

          


          </Route>
          
          



        </Routes>

       

        <Toaster />


      </main>
     
      
    </>
  )
}

export default App
