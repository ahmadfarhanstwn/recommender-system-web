import { HomeWrapper } from "../StyledComponents/Components";
import educationVector from "../Assets/education.png";
import { Typography } from "@mui/material";

export const HomePage = () => {
  return (
    <HomeWrapper>
      <div>
        <img src={educationVector} alt="" />
      </div>
      <div>
        <Typography
          variant="h3"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            flexGrow: 1,
            fontFamily: "Poppins",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            marginBottom: "2rem",
          }}
        >
          Dapatkan rekomendasimu disini!
        </Typography>
        <Typography
          variant="p"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            flexGrow: 1,
            fontFamily: "Poppins",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          EduChan adalah sistem yang dapat merekomendasikanmu beberapa saluran
          Youtube edukasi. Kamu hanya perlu menginputkan kata kunci ataupun
          saluran Youtube edukasi favoritmu. Sistem ini dibuat menggunakan
          metode neural network Word Embeddings dengan bantuan Word2Vec, jadi
          sistem ini akan merekomendasikanmu saluran Youtube yang serupa
          berdasarkan kesamaan kata semantik dari atribut-atribut saluran yang
          tersedia. Selamat menggunakan EduChan!
        </Typography>
      </div>
    </HomeWrapper>
  );
};
