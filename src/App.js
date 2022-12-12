import "./App.css";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import Nav from "./components/Nav";
import Mypage from "./components/Mypage";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [myLogArr, setMyLogArr] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    if (myLogArr.length > 0) {
      localStorage.setItem("logArr", JSON.stringify(myLogArr));
    }
  }, [myLogArr]);

  let title,
    image,
    pubDate,
    userRating,
    note = null;
  for (let i = 0; i < myLogArr.length; i++) {
    if (myLogArr[i].id === currentId) {
      title = myLogArr[i].title;
      image = myLogArr[i].image;
      pubDate = myLogArr[i].pubDate;
      userRating = myLogArr[i].userRating;
      note = myLogArr[i].note;
    }
  }

  return (
    <BackgroundWrapper>
      <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <SideBarWrapper>
                <div>
                  <h1>Cinema Library</h1>
                </div>
                <Nav></Nav>
              </SideBarWrapper>
            </Grid>

            <Grid item xs={10}>
              <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route
                  path="/search"
                  element={
                    <Search
                      onCreate={(
                        id,
                        image,
                        title,
                        pubDate,
                        userRating,
                        note
                      ) => {
                        const newLog = {
                          id: nextId,
                          image: image,
                          title: title,
                          pubDate: pubDate,
                          userRating: userRating,
                          note: note,
                        };
                        const newLogs = [...myLogArr];
                        newLogs.push(newLog);
                        console.log(newLogs);
                        setCurrentId(nextId);
                        setNextId(nextId + 1);
                        setMyLogArr(newLogs);
                      }}
                    ></Search>
                  }
                ></Route>
                <Route
                  path="/mypage"
                  element={
                    <Mypage
                      onUpdate={(title, pubDate, image, userRating, note) => {
                        const newMyLogArr = [...myLogArr];
                        const updatedmyLogArr = {
                          id: currentId,
                          title: title,
                          pubDate: pubDate,
                          image: image,
                          userRating: userRating,
                          note: note,
                        };
                        console.log(newMyLogArr);
                        console.log(updatedmyLogArr);

                        // for (let i = 0; newMyLogArr.length > i; i++) {
                        //   if (newMyLogArr[i].id === updatedmyLogArr.id) {
                        //     newMyLogArr[i] = updatedmyLogArr;
                        //     break;
                        //   }
                        // }
                        setMyLogArr(arr => arr.map(item => item.id === currentId ? {...item, title, pubDate, image, userRating, note} : item));
                        console.log(newMyLogArr);
                      }}
                      title={title}
                      image={image}
                      pubDate={pubDate}
                      userRating={userRating}
                      note={note}
                    ></Mypage>
                  }
                ></Route>
              </Routes>
            </Grid>
          </Grid>
        </Box>
      </BrowserRouter>
    </BackgroundWrapper>
  );
}

const BackgroundWrapper = styled.div`
  background-color: #222;
  color: #fff;
`;

const SideBarWrapper = styled.div`
  margin: 50px;
  margin-top: 60px;
  background-color: #222;
  border-bottom: 2px solid #444;
`;

const NavWrapper = styled.div`
width: 
  text-align: center;
`;
export default App;
