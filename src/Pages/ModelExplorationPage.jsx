/*
  TODO:
  - handle submit based on criteria
  - handle result component, there are 4 condition:
    if there are results
    if error (need to change code in collab also)
    if loading
    if there are no results (usually when it start)
*/

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  ExploreModelInput,
  RecommenderWrapper,
} from "../StyledComponents/Components";
import axios from "axios";

const getFindWordSimilarity = (word) => {
  let bodyForm = new FormData();
  bodyForm.append("word", word);
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/find_word_similarity`,
    data: bodyForm,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const getFindSimilaritySum = (word1, word2) => {
  let bodyForm = new FormData();
  bodyForm.append("word1", word1);
  bodyForm.append("word2", word2);
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/count_similarity_between_words`,
    data: bodyForm,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const getArithmatics = (wordPlus1, wordPlus2, wordMinus) => {
  let bodyForm = new FormData();
  bodyForm.append("wordPlus1", wordPlus1);
  bodyForm.append("wordPlus2", wordPlus2);
  bodyForm.append("wordMinus", wordMinus);
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/find_word_by_arithmatic`,
    data: bodyForm,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const ModelExplorationPage = () => {
  /*
    Three mode :
    - findSimilarWords
    - findSimilaritySum
    - arithmatics
    */
  const [mode, setMode] = useState("findSimilarWords");
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState(""); // for findSimilarityWords

  const [input1Value, setInput1Value] = useState(""); //for first word in findSimilaritySum
  const [input2Value, setInput2Value] = useState(""); //for second word in findSimilaritySum

  const [inputPlus1Value, setInputPlus1Value] = useState(""); //for first plus word in arithmatics
  const [inputPlus2Value, setInputPlus2Value] = useState(""); //for second plus word in arithmatics
  const [inputMinusValue, setInputMinusValue] = useState(""); //for minus word in arithmatics

  const [isLoading, setIsLoading] = useState(false);
  const [errorValue, setErrorValue] = useState("");

  const handleChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleChangeInput1 = (event) => {
    setInput1Value(event.target.value);
  };

  const handleChangeInput2 = (event) => {
    setInput2Value(event.target.value);
  };

  const handleChangeInputPlus1 = (event) => {
    setInputPlus1Value(event.target.value);
  };
  const handleChangeInputPlus2 = (event) => {
    setInputPlus2Value(event.target.value);
  };
  const handleChangeInputMinus = (event) => {
    setInputMinusValue(event.target.value);
  };

  const handleMode = (event) => {
    setMode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setResults([]);
    setErrorValue("");
    setIsLoading(true);
    //call api by conditioning based on criteria
    setResults([]);
    if (mode === "findSimilarWords") {
      getFindWordSimilarity(inputValue).then((res) => {
        setIsLoading(false);
        console.log(res.data);
        res.error ? setErrorValue(res.data) : setResults(res.data);
      });
    } else if (mode === "findSimilaritySum") {
      getFindSimilaritySum(input1Value, input2Value).then((res) => {
        setIsLoading(false);
        console.log(res.data);
        res.error ? setErrorValue(res.data) : setResults(res.data);
      });
    } else {
      getArithmatics(inputPlus1Value, inputPlus2Value, inputMinusValue).then(
        (res) => {
          setIsLoading(false);
          console.log(res.data);
          res.error ? setErrorValue(res.data) : setResults(res.data);
        }
      );
    }
  };

  return (
    <RecommenderWrapper>
      <Stack direction="row" spacing={2} marginBottom="1rem">
        {mode === "findSimilarWords" && (
          <ExploreModelInput>
            <TextField
              sx={{
                width: "100%",
                color: "white",
                backgroundColor: "#EEEEEE",
                borderColor: "#C70039",
                fontFamily: "Poppins",
              }}
              id="outlined-basic"
              label="Kata"
              variant="outlined"
              value={inputValue}
              onChange={handleChangeInput}
            />
          </ExploreModelInput>
        )}
        {mode === "findSimilaritySum" && (
          <ExploreModelInput>
            <TextField
              sx={{
                width: "49%",
                color: "white",
                backgroundColor: "#EEEEEE",
                borderColor: "#C70039",
                fontFamily: "Poppins",
                marginRight: "1rem",
              }}
              id="outlined-basic"
              label="Kata 1"
              variant="outlined"
              value={input1Value}
              onChange={handleChangeInput1}
            />
            <TextField
              sx={{
                width: "49%",
                color: "white",
                backgroundColor: "#EEEEEE",
                borderColor: "#C70039",
                fontFamily: "Poppins",
              }}
              id="outlined-basic"
              label="Kata 2"
              variant="outlined"
              value={input2Value}
              onChange={handleChangeInput2}
            />
          </ExploreModelInput>
        )}
        {mode === "arithmatics" && (
          <ExploreModelInput>
            <TextField
              sx={{
                width: "29%",
                color: "white",
                backgroundColor: "#EEEEEE",
                borderColor: "#C70039",
                fontFamily: "Poppins",
                marginRight: "1rem",
              }}
              id="outlined-basic"
              label="Kata Positif 1"
              variant="outlined"
              value={inputPlus1Value}
              onChange={handleChangeInputPlus1}
            />
            <Typography
              variant="p"
              sx={{
                marginRight: "1rem",
                flexGrow: 1,
                fontSize: "35px",
                fontFamily: "Poppins",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              +
            </Typography>
            <TextField
              sx={{
                width: "29%",
                color: "white",
                backgroundColor: "#EEEEEE",
                borderColor: "#C70039",
                fontFamily: "Poppins",
                marginRight: "1rem",
              }}
              id="outlined-basic"
              label="Kata Positif 2"
              variant="outlined"
              value={inputPlus2Value}
              onChange={handleChangeInputPlus2}
            />
            <Typography
              variant="p"
              sx={{
                marginRight: "1rem",
                flexGrow: 1,
                fontSize: "35px",
                fontFamily: "Poppins",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              -
            </Typography>
            <TextField
              sx={{
                width: "29%",
                color: "white",
                backgroundColor: "#EEEEEE",
                borderColor: "#C70039",
                fontFamily: "Poppins",
              }}
              id="outlined-basic"
              label="Kata Negatif"
              variant="outlined"
              value={inputMinusValue}
              onChange={handleChangeInputMinus}
            />
          </ExploreModelInput>
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
            <InputLabel id="demo-simple-select-label">Mode</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mode}
              label="Kriteria"
              onChange={handleMode}
            >
              <MenuItem value={"findSimilarWords"}>
                Mencari Kata Terdekat
              </MenuItem>
              <MenuItem value={"findSimilaritySum"}>
                Mencari Nilai Kesamaan
              </MenuItem>
              <MenuItem value={"arithmatics"}>Perhitungan Aritmatika</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
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
        Hasil :
      </Typography>
      {/* table */}
    </RecommenderWrapper>
  );
};
