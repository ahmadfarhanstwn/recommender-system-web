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
} from "@mui/material";
import { RecommenderWrapper } from "../StyledComponents/Components";
import axios from "axios";

export const RecommenderPage = () => {
  const [criteria, setCriteria] = useState("channelName");
  const [suggestion, setSuggestion] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorValue, setErrorValue] = useState("");

  const handleChangeCriteria = (event) => {
    setCriteria(event.target.value);
  };

  const handleChangeInput = (event) => {
    setInputValue(event.target.value);
    if (criteria === "channelName") {
      //handle set suggestion by call suggestion through api
      axios
        .post(`${process.env.API_URL}`, {
          keyword: inputValue,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorValue("");
    setResults([]);
    setIsLoading(true);
    //call api by conditioning based on criteria
    if (criteria === "channelName") {
      axios
        .post(`${process.env.API_URL}/recommendations`, {
          channel_name: inputValue,
        })
        .then((response) => {
          setIsLoading(false);
          const data = response.data.data;
          if (!response.data.error) {
            setResults(data);
          } else {
            setErrorValue(data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorValue(error);
        });
    } else {
      axios
        .post(`${process.env.API_URL}/recommendations_by_keywords`, {
          keyword: inputValue,
        })
        .then((response) => {
          setIsLoading(false);
          const data = response.data.data;
          if (!response.data.error) {
            setResults(data);
          } else {
            setErrorValue(data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorValue(error);
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
            options={suggestion}
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
            onChange={handleChangeInput}
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
            value={inputValue}
            id="outlined-basic"
            label="Kata Kunci"
            variant="outlined"
            onChange={handleChangeInput}
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
        <Button variant="contained" onSubmit={handleSubmit}>
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
    </RecommenderWrapper>
  );
};
