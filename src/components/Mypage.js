import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CloseIcon from "@mui/icons-material/Close";
import { Identity } from "@mui/base";

function Mypage(props) {
  const [posts, setPosts] = useState([]);

  const [toggleShow, setToggleShow] = useState(false);
  const [title, setTitle] = useState();
  const [pubDate, setPubDate] = useState();
  const [userRating, setUserRating] = useState();
  const [note, setNote] = useState();

  //모달창 밖 클릭시 모달창 닫기
  const modalRef = useRef(null);
  const imageRef = useRef(null);

  const onUpdate = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const pubDate = e.target.pubDate.value;
    const image = imageRef.current;
    const userRating = e.target.userRating.value;
    const note = e.target.note.value;

    props.onUpdate(title, pubDate, image, userRating, note);

    setToggleShow(false);
    console.log(posts);

    alert("수정 되었습니다");
  };

  useEffect(() => {
    const toggleShowHandler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setToggleShow(false);
      }
    };
    window.addEventListener("mousedown", toggleShowHandler);
    return () => {
      window.removeEventListener("mousedown", toggleShowHandler);
    };
  }, []);

  const remove = (id) => {
    //! mypage에서는 삭제되었는데 새로고침하면 원상태로 됨
    //! app.js에서 localStorage에 있는 데이터를 state변경이 될 때마다 useEffect로 다시 그려줘서 그런가?
    setPosts((post) => post.filter((item) => id !== item.id));
  };

  //! useEffect를 실행시키면 app.js에서 자꾸 기전의 localstorage를 불러와서 mypage 수정이 안되는 것 같다.
  //! onClick 이벤트가 실행되었을 때 posts가 변경되고, 그 변경된 posts를 다시 그려줘야 하는데
  useEffect(() => {
    if (posts.length > -1) {
      setPosts(JSON.parse(localStorage.getItem("logArr")));
    }
  }, []);

  return (
    <BackgroundWrapper>
      <MainWrapper>
        <div>
          <h1>My Log</h1>
        </div>
      </MainWrapper>

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {posts.map((item, index) => (
            <ItemContainer key={index}>
              <Card sx={{ width: "15vw" }}>
                <CardWrapper>
                  <CardContent>
                    <ImageWrapper>
                      <img src={item.image} style={{ width: "12vw" }}></img>
                    </ImageWrapper>
                    <TextWrapper>
                      <Typography variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {item.pubDate} /{item.userRating}
                      </Typography>
                      <Typography variant="body2">{item.note}</Typography>
                    </TextWrapper>
                    <div>
                      <DriveFileRenameOutlineIcon
                        onClick={() => {
                          setToggleShow(!toggleShow);
                          setTitle(item.title);
                          setPubDate(item.pubDate);
                          imageRef.current = item.image;
                          // console.log(imageRef.current);
                          setUserRating(item.userRating);
                          setNote(item.note);
                          console.log(item.id);
                        }}
                      ></DriveFileRenameOutlineIcon>
                      <DeleteIcon
                        onClick={() => {
                          console.log(item.id);
                          remove(item.id);
                        }}
                      ></DeleteIcon>
                    </div>
                  </CardContent>
                </CardWrapper>
              </Card>
            </ItemContainer>
          ))}
          {toggleShow && (
            <FormWrapper ref={modalRef}>
              <form
                onSubmit={(e) => {
                  onUpdate(e);
                }}
              >
                <CloseIconWrapper>
                  <CloseIcon
                    onClick={() => {
                      setToggleShow(false);
                    }}
                    style={{ color: "black" }}
                  ></CloseIcon>
                </CloseIconWrapper>
                <p>
                  <img
                    name="image"
                    // value={imageRef.current}
                    style={{ width: "10vw" }}
                    src={imageRef.current}
                  ></img>
                </p>
                <p>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder={title}
                  ></input>
                </p>
                <p>
                  <input
                    type="text"
                    name="pubDate"
                    value={pubDate}
                    placeholder={pubDate}
                  ></input>
                </p>
                <p>
                  <input
                    type="text"
                    name="userRating"
                    value={userRating}
                    placeholder={userRating}
                  ></input>
                </p>
                <p>
                  <input
                    type="textarea"
                    name="note"
                    value={note}
                    placeholder={note}
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  ></input>
                </p>
                <p>
                  <button type="submit">UPDATE</button>
                </p>
              </form>
            </FormWrapper>
          )}
        </Grid>
      </Box>
    </BackgroundWrapper>
  );
}

const CloseIconWrapper = styled.div`
  width: 10vw;
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 10vh;
  right: 35vw;
  width: 20vw;
  height: 90vh;
  z-index: 99;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
`;
const ItemContainer = styled.div`
  margin-right: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  width: 13vw;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackgroundWrapper = styled.div`
  background-color: #222;
  color: #fff;
`;

const MainWrapper = styled.div`
  display: flex;
  margin: 50px;
  border-bottom: 2px solid #444;
`;

export default Mypage;
