
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Counter from './Counter/Counter';
import Default from './Default';
import AddForm from './Executive/AddExecutive/AddForm';

import LoginExecutive from './Executive/LoginExecutive/LoginExecutive';
import TokenCard from './GenerateToken/TokenCard/TokenCard';
import TokenForm from './GenerateToken/TokenForm';
import Header from './Header/Header';
import Login from './Login/Login';
import Manager from './Manager/Manager';
import Service from './Services/Service';
import ManagerProfile from './Manager/ManagerProfile';
import DetailsScreen from './DetailsScreen/DetailsScreen';



// axios.get(url).then((response) => {
//   alert(response.data);
// });

// axios.post(baseURL, {
//   title: "Hello World!",
//   body: "This is a new post."
// })
//   .then((response) => {
//     setPost(response.data);
//   });



function App() {
  return (
    <>
      <div className='home'>
        <BrowserRouter >
          <Routes>
            <Route exact path='/' element={<Default />} />
            <Route path='/manager' element={<Login />} >
              <Route exact path='/manager/managerProfile' element={< ManagerProfile />} />
              <Route exact path='/manager/service' element={<Service />} />
              <Route exact path='/manager/counter' element={< Counter head="Add" />} />
              <Route exact path='/manager/updatecounter' element={< Counter head="Update" />} />
              <Route exact path='/manager/addExecutive' element={<AddForm obj={{
                url: "/addExecutive",
                heading: "Add Executive",
                one: "name",
                two: "email",
                three: "mob",
                four: "password"
              }} />} />
            </Route>
            <Route exact path='/executive' element={< LoginExecutive />} />
            <Route exact path='/user' element={< TokenForm />} />
            <Route exact path='/detailsScreen' element={< DetailsScreen />} />

          </Routes>
        </BrowserRouter>

      </div>




      {/* <DetailsScreen/> */}
      {/* manager */}
      {/* <Login />    */}

      {/* <LoginExecutive /> */}

      {/* <TokenForm/> */}



      {/* <TokenCard obj={{
                    "tokenId": 0,
                    "tokenNo": 13,
                    "counterNo": 11,
                    "serviceName": "service1",
                    "timeGenerated": "17:19:51 05/04/2023",
                    "expectedTime": "17:28:51 05/04/2023",
                    "status": "PENDING"
                  }} /> */}
      {/* <Header counterNo="4"/> */}
      {/* <Manager/> */}
      {/* <Service/> */}
      {/* <AddForm obj={{
                  url:"/addExecutive", 
                  heading:"Add Executive", 
                  one:"name", 
                  two:"email", 
                  three:"mob", 
                  four:"password"} } /> */}

      {/* <AddForm obj={{
                  url:"/loginExecutive",
                  heading:"mail",
                  one:"ePassword",
                  two:"Email",
                  three:"counterNumber",
                  four:"cPassword" }}/> */}
      {/* <Counter/> */}

    </>

  );
}

export default App;
