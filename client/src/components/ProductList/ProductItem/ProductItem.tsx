import React from "react";
import {
  alpha,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  styled,
  Typography
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  FavoriteBorderRounded as FavoriteBorderRoundedIcon,
  FavoriteOutlined as FavoriteOutlinedIcon
} from "@mui/icons-material";
import { IProduct } from "../../../models/IProduct";
import { productCartSlicer } from "../../../store/reducers/productCartSlicer";
import { productLikedSlicer } from "../../../store/reducers/productLikedSlicer";
import { comparisonSlicer } from "../../../store/reducers/comparisonSlicer";
import { Link } from "react-router-dom";

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
interface IProductItem {
  product: IProduct;
}

export default function ProductItem({ product }: IProductItem) {
  const { products } = useAppSelector((state) => state.productLikedReducer);
  const { addToCart } = productCartSlicer.actions;
  const { addToSort } = comparisonSlicer.actions;
  const { ToggleToLiked } = productLikedSlicer.actions;
  const dispatch = useAppDispatch();

  const handelerOnAddSortClick = () => {
    dispatch(addToSort(product));
  };
  const handelerOnAddLikedClick = () => {
    dispatch(ToggleToLiked(product));
  };
  const handelerOnAddCartClick = () => {
    dispatch(addToCart(product));
  };

  return (
    <Grid item xs={12} sm={6} md={6} xl={4}>
      <Card data-id={product.id} sx={{ minHeight: "500px" }}>
        <CardMedia
          sx={{ objectFit: "contain" }}
          component="img"
          height={500}
          image={product.image}
          alt="img"
        />
        <CardContent>
          <Typography gutterBottom noWrap variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" noWrap color="text.secondary">
            {product.description}
          </Typography>
          <Link
            to={`/aboutProduct/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <StyledButton size="small">Подробнее...</StyledButton>
          </Link>
          <Typography marginTop="5px" variant="h4" color="text.secondary">
            {product.price}$
            <Rating
              sx={{ padding: "0 40px" }}
              size="small"
              name="half-rating"
              readOnly
              defaultValue={product.rating.rate}
              precision={0.5}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <StyledIconButton
            onClick={() => handelerOnAddLikedClick()}
            aria-label="add to favorite"
          >
            {products.some(
              (likedProducts) => likedProducts.id === product.id
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
          <StyledButton onClick={() => handelerOnAddSortClick()} size="small">
            Добавить в сравнение
          </StyledButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
