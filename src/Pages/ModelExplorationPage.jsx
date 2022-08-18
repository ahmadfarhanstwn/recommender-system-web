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
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  ExploreModelInput,
  RecommenderWrapper,
} from "../StyledComponents/Components";
import errorImage from "../Assets/error_image.png";
import { TailSpin } from "react-loader-spinner";
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
    url: `${process.env.REACT_APP_API_URL}/find_word_by_arithmatics`,
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
  const [arithmaticsResult, setArithmaticsResult] = useState([]);
  const [countSimilarityResult, setCountSimilarityResult] = useState("");
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
    setArithmaticsResult([]);
    setCountSimilarityResult("");
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
        res.error
          ? setErrorValue(res.data)
          : setCountSimilarityResult(res.data);
      });
    } else {
      getArithmatics(inputPlus1Value, inputPlus2Value, inputMinusValue).then(
        (res) => {
          setIsLoading(false);
          console.log(res.data);
          res.error ? setErrorValue(res.data) : setArithmaticsResult(res.data);
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
      {results.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Hasil Kata</TableCell>
                <TableCell align="right">Nilai Similarity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {result[0]}
                  </TableCell>
                  <TableCell align="right">{result[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {arithmaticsResult.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Hasil Kata</TableCell>
                <TableCell align="right">Nilai Similarity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={0}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {arithmaticsResult[0]}
                </TableCell>
                <TableCell align="right">{arithmaticsResult[1]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {countSimilarityResult.length > 0 && (
        <div>
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
            Nilai similarity dari "{input1Value}" dan "{input2Value}" adalah
            senilai : {countSimilarityResult}
          </Typography>
        </div>
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
