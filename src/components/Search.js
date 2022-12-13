import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

function Search(props) {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(
    localStorage.getItem("searchKeyword") !== null
      ? localStorage.getItem("searchKeyword")
      : ""
  );
  const [imageUrl, setImageUrl] = useState();
  const [title, setTitle] = useState();
  const [pubDate, setPubDate] = useState();
  const [userRating, setUserRating] = useState();
  const [note, setNote] = useState();
  const [toggleShow, setToggleShow] = useState(false);

  const searchMovieData = async () => {
    const res = await axios.get(`/v1/search/movie.json?query=${search}`, {
      headers: {
        "X-Naver-Client-Id": "k4YNVOIeyfdKGfrxXlSw",
        "X-Naver-Client-Secret": "qbMUbDEV0O",
      },
    });
    const data = res.data.items;
    setPosts(data);
  };



  const theadOptions = ["", "제목", "개봉년도", "네이버 평점", "담기"];

  const searchMovie = (e) => {
    localStorage.setItem("searchKeyword", e.target.value);
    setSearch(e.target.value);
  };

  const navigate = useNavigate();
  const modalRef = useRef(null);

  const onsubmit = (e) => {
    e.preventDefault();
    let id, image, title, pubDate, userRating, note;

    image = imageUrl;
    title = e.target.title.value;
    pubDate = e.target.pubDate.value;
    userRating = e.target.userRating.value;
    note = e.target.note.value;

    props.onCreate(id, image, title, pubDate, userRating, note);

    alert("MY LOG에 추가되었습니다");
    navigate("/mypage");
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
  });

  useEffect(() => {
    if(search !== "" && search.length > 5){
      searchMovieData();
    }
    // console.log('data')
  }, []);

  return (
    <BackgroundWrapper>
      <MainWrapper>
        <div>
          <h1>Search</h1>
        </div>
      </MainWrapper>
      <MainWrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchMovieData();
          }}
        >
          <p>
            <input
              type="text"
              placeholder="title"
              onChange={(e) => {
                searchMovie(e);
              }}
            ></input>
            <button type="submit">검색</button>
          </p>
        </form>

        <table>
          <thead>
            <tr>
              {theadOptions.map((item, i) => (
                <ThWrapper key = {i}>{item}</ThWrapper>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => (
              <tr key={index}>
                <TdWrapper>
                  <a href={item.link}>
                    <img style={{ width: "10vw" }} src={item.image}></img>
                  </a>
                </TdWrapper>
                <TdWrapper name="title" value={item.title}>
                  {item.title}
                </TdWrapper>
                <TdWrapper name="pubDate">{item.pubDate}</TdWrapper>
                <TdWrapper name="userRating">{item.userRating}</TdWrapper>
                <TdWrapper>
                  <AddCircleOutlineIcon
                    className="fas fa-plus-circle"
                    
                    sx={{ fontSize: 30 }}
                    onClick={() => {
                      setImageUrl(item.image);
                      setTitle(item.title);
                      setPubDate(item.pubDate);
                      setUserRating(item.userRating);
                      setToggleShow(true);
                    }}
                  />
                </TdWrapper>
              </tr>
            ))}
          </tbody>
        </table>
        {toggleShow && (
          <FormWrapper ref={modalRef}>
            <form
              onSubmit={(e) => {
                onsubmit(e);
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
                  defaultValue={imageUrl}
                  style={{ width: "10vw" }}
                  src={imageUrl}
                ></img>
              </p>
              <p>
                <input
                  type="text"
                  name="title"
                  defaultValue={title}
                  placeholder={title}
                ></input>
              </p>
              <p>
                <input
                  type="text"
                  name="pubDate"
                  defaultValue={pubDate}
                  placeholder={pubDate}
                ></input>
              </p>
              <p>
                <input
                  type="text"
                  name="userRating"
                  defaultValue={userRating}
                  placeholder={userRating}
                ></input>
              </p>
              <p>
                <input
                  type="textarea"
                  name="note"
                  placeholder="note"
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                ></input>
              </p>
              <p>
                <button type="submit">POST</button>
              </p>
            </form>
          </FormWrapper>
        )}
      </MainWrapper>
    </BackgroundWrapper>
  );
}

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
const CloseIconWrapper = styled.div`
  width: 10vw;
`;
const BackgroundWrapper = styled.div`
  background-color: #222;
  color: #fff;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px;
  border-bottom: 2px solid #444;
`;

const TdWrapper = styled.td`
  border-bottom: 1px solid #fff;
  text-align: center;
  border-collapse: collapse;
  width: 10vw;
`;

const ThWrapper = styled.th`
  border-bottom: 1px solid #fff;
`;
export default Search;
