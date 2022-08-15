/*
  TODO:
  - handle suggestion API
  - handle submit based on criteria
  - handle result component, there are 4 condition:
    if there are results
    if error (need to change code in collab also)
    if loading
    if there are no results (usually when it start)
*/

import { useState } from "react";
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
  Autocomplete,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  List,
  ListItemText,
  Divider,
} from "@mui/material";
import errorImage from "../Assets/error_image.png";
import { RecommenderWrapper } from "../StyledComponents/Components";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const getRecommendationByChannelName = (value) => {
  let bodyForm = new FormData();
  bodyForm.append("channel_name", value);
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/recommendations`,
    data: bodyForm,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const getRecommendationByKeyword = (value) => {
  let bodyForm = new FormData();
  bodyForm.append("keyword", value);
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/recommendations_by_keywords`,
    data: bodyForm,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const RecommenderPage = () => {
  const [criteria, setCriteria] = useState("channelName");
  const [suggestion, setSuggestion] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputKeywordValue, setInputKeywordValue] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorValue, setErrorValue] = useState("");

  const handleChangeCriteria = (event) => {
    setCriteria(event.target.value);
  };

  const handleChangeKeywordInput = (event) => {
    setInputKeywordValue(event.target.value);
  };

  const handleChangeInput = (event, value) => {
    setInputValue(value);
    if (criteria === "channelName") {
      // console.log(`${process.env.API_URL}/get_channels`);
      //handle set suggestion by call suggestion through api
      let bodyForm = new FormData();
      bodyForm.append("keyword", inputValue);
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/get_channels`,
        data: bodyForm,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          const data = response.data.data;
          setSuggestion(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorValue("");
    setResults([]);
    setIsLoading(true);
    console.log("clicked");
    //call api by conditioning based on criteria
    if (criteria === "channelName") {
      getRecommendationByChannelName(inputValue).then((res) => {
        setIsLoading(false);
        console.log(res.data);
        res.error ? setErrorValue(res.data) : setResults(res.data);
      });
    } else {
      getRecommendationByKeyword(inputKeywordValue).then((res) => {
        setIsLoading(false);
        console.log(res.data);
        res.error ? setErrorValue(res.data) : setResults(res.data);
      });
    }
  };

  return (
    <RecommenderWrapper>
      <Stack direction="row" spacing={2} marginBottom="1rem">
        {criteria === "channelName" && (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Array.isArray(suggestion) ? suggestion : []}
            value={inputValue}
            sx={{
              width: "73%",
              color: "white",
              backgroundColor: "#EEEEEE",
              borderColor: "#C70039",
              fontFamily: "Poppins",
            }}
            renderInput={(params) => (
              <TextField {...params} label="Nama Channel" />
            )}
            onInputChange={handleChangeInput}
          />
        )}
        {criteria === "keyword" && (
          <TextField
            sx={{
              width: "73%",
              color: "white",
              backgroundColor: "#EEEEEE",
              borderColor: "#C70039",
              fontFamily: "Poppins",
            }}
            value={inputKeywordValue}
            id="outlined-basic"
            label="Kata Kunci"
            variant="outlined"
            onChange={handleChangeKeywordInput}
          />
        )}
        <Box
          sx={{
            width: 150,
            color: "white",
            backgroundColor: "#EEEEEE",
            borderColor: "#C70039",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Kriteria</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={criteria}
              label="Kriteria"
              onChange={handleChangeCriteria}
            >
              <MenuItem value={"channelName"}>Nama Channel</MenuItem>
              <MenuItem value={"keyword"}>Kata Kunci</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" onClick={handleSubmit}>
          Cari Rekomendasi
        </Button>
      </Stack>
      <Typography
        variant="p"
        sx={{
          mr: 2,
          flexGrow: 1,
          fontFamily: "Poppins",
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Hasil Rekomendasi :
      </Typography>
      {results.length > 0 && (
        <List
          sx={{
            width: "100%",
            // padding: "1px",
            bgcolor: "#202040",
          }}
        >
          <Divider
            variant="inset"
            component="li"
            sx={{ bgcolor: "white", width: "100%" }}
          />
          {results.map((result) => (
            <>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src={result.avatarUrl}
                    sx={{
                      width: 100,
                      height: 100,
                      mr: "1rem",
                      mt: "1rem",
                      mb: "1rem",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{ width: "50%" }}
                  primary={
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        flexGrow: 1,
                        fontFamily: "Roboto",
                        // fontWeight: 700,
                        color: "inherit",
                        textDecoration: "none",
                        fontSize: "16px",
                      }}
                    >
                      {result.channelName}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="p"
                        sx={{
                          mb: 2,
                          // flexGrow: 1,
                          fontFamily: "Roboto",
                          // fontWeight: 700,
                          color: "#A9A9A9",
                          textDecoration: "none",
                          fontSize: "12px",
                        }}
                      >
                        {`${result.subscriberCount} subscribers`}
                      </Typography>
                      <br />
                      <Typography
                        variant="p"
                        sx={{
                          // mb: 2,
                          // flexGrow: 1,
                          fontFamily: "Roboto",
                          // fontWeight: 700,
                          color: "#A9A9A9",
                          textDecoration: "none",
                          fontSize: "12px",
                        }}
                      >
                        {result.description}
                      </Typography>
                    </>
                  }
                />
                <Button
                  href={result.channel_links}
                  target="_blank"
                  sx={{ bgcolor: "#cc0101" }}
                  variant="contained"
                >
                  Kunjungi Saluran
                </Button>
              </ListItem>
              <Divider
                variant="inset"
                component="li"
                sx={{ bgcolor: "white" }}
              />
            </>
          ))}
        </List>
      )}
      {isLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TailSpin color="#cc0101" height={80} width={80} />{" "}
        </div>
      )}
      {errorValue.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={errorImage} alt="" />
          <Typography
            variant="p"
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              fontFamily: "Poppins",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {errorValue}
          </Typography>
        </div>
      )}
    </RecommenderWrapper>
  );
};
