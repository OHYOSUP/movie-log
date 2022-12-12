import React from "react";
import { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

function Home() {
  const [posts, setPosts] = useState([]);
  const [weekPosts, setWeekPosts] = useState([]);
  const [monthPosts, setMonthPosts] = useState([]);

  const [targetDt, setTargetDt] = useState(
    parseInt(moment().subtract(1, "d").format("YYYYMMDD"))
  );
  const [weekTargetDt, setWeekTargetDt] = useState(
    parseInt(moment().subtract(1, "w").format("YYYYMMDD"))
  );
  const [monthTargetDt, setMonthTargetDt] = useState(
    parseInt(moment().subtract(4, "w").format("YYYYMMDD"))
  );
  const [type, setType] = useState("day");
  const [weekGb, setWeekGb] = useState("0");
  const [checked, setChecked] = useState("checked")

  const tableHeadOption = ["TITLE", "개봉일", "누적관객수"];

  const typeToggle = () => {
    const key = "c158df0ef8819d89e520ebeea9f51000";

    if (type === "day") {
      const key = "c158df0ef8819d89e520ebeea9f51000";
      axios
        .get(
          `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=${targetDt}`
        )
        .then((res) => {
          const data = res.data.boxOfficeResult.dailyBoxOfficeList;
          // console.log(data);
          setPosts(data);
          // console.log(type);
        });
    } else if (type === "week") {
      axios
        .get(
          `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${key}&targetDt=${weekTargetDt}&weekGb=${weekGb}`
        )
        .then((res) => {
          const data = res.data.boxOfficeResult.weeklyBoxOfficeList;
          setWeekPosts(data);
          // console.log(type);
        });
    } else if (type === "month") {
      axios
        .get(
          `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${key}&targetDt=${monthTargetDt}&weekGb=${weekGb}`
        )
        .then((res) => {
          const data = res.data.boxOfficeResult.weeklyBoxOfficeList;
          setMonthPosts(data);
          // console.log(type);
        });
    }
  };

  useEffect(() => {
    typeToggle();
  }, [type]);

  return (
    <BackgroundWrapper>     
            <MainWrapper>
              <div>
                <h1>BOX OFFICE</h1>
                <RadioGroupWrapper>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio/>}                        
                        
                        label="일간"
                        onClick={() => {
                          setType("day");
                          
                        }}
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="주간"
                        onClick={() => {
                          setType("week");
                        }}
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="월간"
                        onClick={() => {
                          setType("month");
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </RadioGroupWrapper>
              </div>
              <table>
                <thead>
                  <tr>
                    {tableHeadOption.map((item) => (
                      <th>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {type === "day" &&
                    posts.map((item) => (
                      <tr>
                        <TdWrapper>{item.movieNm}</TdWrapper>
                        <TdWrapper>{item.openDt}</TdWrapper>
                        <TdWrapper>
                          {Math.floor(item.audiAcc / 10000)}만
                        </TdWrapper>
                      </tr>
                    ))}
                  {type === "week" &&
                    weekPosts.map((item) => (
                      <tr>
                        <TdWrapper>{item.movieNm}</TdWrapper>
                        <TdWrapper>{item.openDt}</TdWrapper>
                        <TdWrapper>
                          {Math.floor(item.audiAcc / 10000)}만
                        </TdWrapper>
                      </tr>
                    ))}
                  {type === "month" &&
                    monthPosts.map((item) => (
                      <tr>
                        <TdWrapper>{item.movieNm}</TdWrapper>
                        <TdWrapper>{item.openDt}</TdWrapper>
                        <TdWrapper>
                          {Math.floor(item.audiAcc / 10000)}만
                        </TdWrapper>
                      </tr>
                    ))}
                </tbody>
              </table>
            </MainWrapper>
          {/* </Grid>
        </Grid>
      </Box> */}
    </BackgroundWrapper>
  );
}

const BackgroundWrapper = styled.div`
  background-color: #222;
  color: #fff;
`;

const TdWrapper = styled.td`
  text-align: center;
  padding-top: 20px;
  width: 20vw;
`;
const RadioGroupWrapper = styled.div`
  border-bottom: 1px solid #fff;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px;
`;



export default Home;
