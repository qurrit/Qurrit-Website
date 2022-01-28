import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component, useState, useEffect } from 'react';

import Navbar from './Navbar'
import About from './Components/About'
import Home from './Components/Home'
import SingleWorkout from './Components/SingleWorkouts'
import SignupPage from './Components/Signup_Page'
import Footer from './Components/Footer'
import LoginPage from './Components/Login_Page'
import Profile from './Components/Profile'
import Program from './Components/ExerciseInput/Program'

import ForgotPassword from './Components/Forgot_Password'
import RazorPay from "./Components/RazorPay";
import Cookies from 'universal-cookie'
import { IconName } from "react-icons/fa";
import ViewProfile from "./Components/ViewProfile";
import Program1 from "./Components/Workout_Entry/Program1";
import UserSettings from "./Components/UserSettings";


function App() {
  const cookies = new Cookies();


  const [tempProgramId, setTempProgramId] = useState(0)
  const [temp, setTemp] = useState('')
  const [userData, setuserData] = useState({

    loggedInStatus: "NOT_LOGGED_IN",
    user: {}
  })

  const fetchProfileData = async (trainer_id, username, user_id) => {


    try {

      const response = await fetch("https://qurrit-react.herokuapp.com/accounts/getprograms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "username": username, 'id': user_id }),
      });

      const tempProfile = response.json()


      tempProfile.then((msg) => {
        console.log(msg)
        setuserData({
          loggedInStatus: 'LOGGED_IN',
          user: {
            loginData: {
              id: trainer_id,
              username: username,
              user_type: msg.user_type,
              programs: msg.programs_bought,
              user_id: user_id,
              profile_image: msg.image
            }
          }
        })
      })


    } catch (error) {
      console.log(error);
    }
  };



  const checkLogin = () => {
    const cookieStatus = cookies.get('Status');
    const cookieTempTrainerId = cookies.get('trainer_id');
    const cookieTempUserId = cookies.get('user_id')
    const cookieTempUserName = cookies.get('userName');


    if (cookieStatus === 'LOGGED_IN') {

      fetchProfileData(cookieTempTrainerId, cookieTempUserName, cookieTempUserId)

    }
  }



  useEffect(() => {
    checkLogin();
  }, [])

  const handleCookie = (x) => {
    setuserData(x)

    cookies.set('Status', 'LOGGED_IN', { path: '/' });
  }

  const handleLogout = () => {
    cookies.remove('userName')
    cookies.remove('user_id')
    cookies.remove('trainer_id')
    cookies.remove('Status')
    setuserData({
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}

    })
  }



  return (
    <React.Fragment>
      <Router forceRefresh={true}>
        <Navbar {...userData} handleLogout={() => handleLogout()} />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/workout/:id" element={<SingleWorkout {...userData} setTempProgramId={setTempProgramId} />}></Route>
          <Route path="login" element={<LoginPage {...userData} handleCookie={handleCookie} />}></Route>
          <Route path="signup" element={<SignupPage {...userData} />}></Route>
          <Route
            exact
            path={"profile"}
            element={<Profile {...userData} />} />
          <Route path="program" element={<Program />}></Route>
          <Route path="program1" element={<Program1 {...userData} />}></Route>
          <Route path="payment" element={<RazorPay {...userData} tempProgramId={tempProgramId} />}></Route>
          <Route path="viewprofile/:username" element={<ViewProfile />}></Route>
          <Route exact path="/forgot" element={<ForgotPassword />}></Route>
          <Route path='/usersettings' element={<UserSettings {...userData} />}></Route>
        </Routes>

      </Router>
      <Footer />
    </React.Fragment >

  );
}

export default App;
