import React, { useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  IconButton,
  styled,
  alpha,
  Divider,
  Button,
  Paper,
  CircularProgress
} from "@mui/material";
import {
  FavoriteBorderRounded as FavoriteBorderRoundedIcon,
  FavoriteOutlined as FavoriteOutlinedIcon
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchProductQuery } from "../api/rtq.api";
import { productCartSlicer } from "../store/reducers/productCartSlicer";
import { comparisonSlicer } from "../store/reducers/comparisonSlicer";
import { productLikedSlicer } from "../store/reducers/productLikedSlicer";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%"
});

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.3)
  }
}));
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.3)
  }
}));

export default function AboutProduct() {
  const { id = "" } = useParams();
  const { isLoading, data: product, isError } = useFetchProductQuery(id);
  const { products } = useAppSelector((state) => state.productLikedReducer);
  const { addToCart } = productCartSlicer.actions;
  const { addToSort } = comparisonSlicer.actions;
  const { ToggleToLiked } = productLikedSlicer.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handelerOnAddSortClick = () => {
    product && dispatch(addToSort(product));
  };
  const handelerOnAddLikedClick = () => {
    product && dispatch(ToggleToLiked(product));
  };
  const handelerOnAddCartClick = () => {
    product && dispatch(addToCart(product));
  };

  useEffect(() => { 
    if (
      (!isLoading && !product) ||
      (!isLoading && product?.id !== Number(id))
    ) {
      navigate("notFound", { replace: true });
    }
  }, [id, isLoading, product, navigate]);

  return (
    <Container>
      {isError && <div>Ошибка! В Карточке товара!</div>}
      {isLoading && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <CircularProgress />
          </Grid>
        </Grid>
      )}
      {!isLoading && (
        <Paper
          sx={{
            p: 2,
            margin: "40px 0 0 0",
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff"
          }}
        >
          <Grid>
            <Grid
              item
              xs={12}
              container
              spacing={2}
              sx={{ margin: "0 0 20px 0" }}
            >
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  № {product && product?.id + "ID" + product?.category}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid xs={12} md={4} item>
                <Img alt="img" src={product?.image} />
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h5" component="div">
                      {product?.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {product?.description}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ cursor: "pointer" }} variant="body2">
                      <StyledIconButton
                        onClick={() => handelerOnAddLikedClick()}
                        aria-label="add to favorite"
                      >
                        {products.some(
                          (likedProducts: { id: number | undefined }) =>
                            likedProducts.id === product?.id
                        ) ? (
                          <FavoriteOutlinedIcon />
                        ) : (
                          <FavoriteBorderRoundedIcon />
                        )}
                      </StyledIconButton>
                      <StyledButton
                        sx={{ border: `1px solid #69B12A` }}
                        variant="outlined"
                        size="large"
                        onClick={() => handelerOnAddCartClick()}
                      >
                        Добавить в корзину
                      </StyledButton>
                      <StyledButton
                        onClick={() => handelerOnAddSortClick()}
                        size="small"
                      >
                        Добавить в сравнение
                      </StyledButton>
                    </Typography>
                  </Grid>
                  <Divider sx={{ marginTop: "20px" }} />
                  <Grid item>
                    <Typography variant="h4" component="div">
                      {product?.price} $
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
}
