import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/students/Home.jsx';
import CoursesList from './pages/students/CoursesList.jsx'
import CourseDetails from './pages/students/CourseDetails.jsx'
import MyEnrollMents from './pages/students/MyEnrollments.jsx'
import Player from './pages/students/Player.jsx'
import Loading from './components/students/Loading.jsx';
import Educator from './pages/educator/Educator.jsx'
import Dashboard from './pages/educator/Dashbord.jsx'
import AddCourse from './pages/educator/AddCourse.jsx'
import MyCourses from './pages/educator/MyCourses.jsx'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
// import Navbar from './components/student/Navbar'
import Navbar from './components/educator/Navbar.jsx';
import "quill/dist/quill.snow.css";
import { ToastContainer } from 'react-toastify';
import About from './components/About'
import ContactForm from './components/ContactForm'


const App = () => {


  const isEducatorRoute = useMatch('/educator/*')



  return (
    <div className='text-default min-h-screen bg-white'>
      <ToastContainer />
      {!isEducatorRoute && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CoursesList />} />
        <Route path='/course-list/:input' element={<CoursesList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrollments' element={<MyEnrollMents />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<ContactForm />} />


        <Route path='/educator' element={<Educator />} >
          <Route path='/educator' element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='student-enrolled' element={<StudentsEnrolled />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
































// import React from 'react'
// import { Route, Routes, useMatch } from 'react-router-dom';
// import Home from "./pages/students/Home.jsx";
// import CoursesList from './pages/students/CoursesList.jsx';
// import CourseDetails from './pages/students/CourseDetails.jsx';
// import MyEnrollments from './pages/students/MyEnrollments.jsx';
// import Player from './pages/students/Player.jsx';
// import Loading from './components/students/Loading.jsx';
// import Educator from './pages/educator/Educator.jsx';
// import Dashbord from './pages/educator/Dashbord.jsx';
// import AddCourse from './pages/educator/AddCourse.jsx';
// import MyCourses from './pages/educator/MyCourses.jsx';
// import StudentsEnrolled from './pages/educator/StudentsEnrolled.jsx';
// import Navbar from './components/students/Navbar.jsx';
// import "quill/dist/quill.snow.css";
//   import { ToastContainer } from 'react-toastify';
//import { addCourse } from './../../server/controllers/educatorController';

// const App = () => {

//   const isEducatorRoute = useMatch('/educator/*')


//   return (
//     <div className='text-default min-h-screen bg-white'>
//       {!isEducatorRoute && <Navbar />}

//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/course-list' element={<CoursesList />} />
//         <Route path='/course-list/:input' element={<CoursesList />} />
//         <Route path='/course/:id' element={<CourseDetails />} />
//         <Route path='/my-enrollments' element={< MyEnrollments />} />
//         <Route path='/player/:courseIs' element={< Player />} />
//         <Route path='/loading/:path' element={<Loading />} />

//         <Route path='/educator' element={<Educator />} >
//           <Route path='/educator' element={<Dashbord />} />
//           <Route path='add-course' element={< AddCourse />} />
//           <Route path='my-course' element={<MyCourses />} />
//           <Route path='student-enrolled' element={<StudentsEnrolled />} />

//         </Route>

//       </Routes>
//     </div>
//   )
// }

// export default App;