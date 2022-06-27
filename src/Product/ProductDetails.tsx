import React from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {makeStyles} from "tss-react/mui";
import {Button, Skeleton, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import ProductRating from "./ProductRating";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useRecoilState} from "recoil";
import {cartState, CartState, favoritesState, FavoritesState} from "../store";

const ProductDetails: React.FC = () => {
    let { id = '' } = useParams();

    const { classes } = useStyles();

    const [cart, setCart] = useRecoilState<CartState>(cartState);
    const [favorites, setFavorites] = useRecoilState<FavoritesState>(favoritesState);

    const [isLoading, setIsLoading] = React.useState(true);
    const [product, setProduct] = React.useState<Product | null>(null);

    React.useEffect(() => {
        setIsLoading(true);
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((res) => setProduct(res.data))
            .finally(() => setIsLoading(false));
    }, [id]);

    const toggleFavorites = React.useCallback(() => {
        const newFavorites = [...favorites];
        const idx = favorites.indexOf(id);
        if (idx === -1) {
            newFavorites.push(id);
        } else {
            newFavorites.splice(idx, 1);
        }
        setFavorites(newFavorites);
    }, [favorites, id, setFavorites]);

    const addToCart = React.useCallback(() => {
        setCart({
            ...cart,
            count: cart.count + 1,
            items: {
                ...cart.items,
                [id]: (cart.items[id] || 0) + 1,
            }
        })
    }, [cart, id, setCart]);

    if (isLoading || product === null) {
        return (
            <div className={classes.root}>
                <div className={classes.image}>
                    <Skeleton variant="rectangular" animation="wave" width="100%" height={350} />
                </div>
                <div className={classes.details}>
                    <Skeleton variant="rectangular" animation="wave" width="100%" height={50} />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                </div>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.image}>
                <img src={product.image} width="80%" />
            </div>
            <div className={classes.divider} />
            <div className={classes.details}>
                <Typography variant="h4">{product.title}</Typography>
                <Typography variant="body1">{product.description}</Typography>
                <ProductRating rating={product.rating} fontSize="large" />
                <Typography variant="h4">€{product.price.toFixed(2)}</Typography>
                <div className={classes.buttons}>
                    <Button
                        variant="outlined"
                        size="large"
                        startIcon={<FavoriteBorderIcon />}
                        onClick={toggleFavorites}
                    >
                        {favorites.includes(id) ? "Remove from" : "Add to"} favorites
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={addToCart}
                    >
                        Add to cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

const useStyles = makeStyles()(() => ({
    root: {
        display: "flex",
        flexDirection: "row",
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "32px",
        gap: "32px",
    },
    image: {
        flex: 1,
        padding: "16px 0",
    },
    divider: {
        backgroundColor: grey[300],
        width: "2px",
        minHeight: "100%"
    },
    details: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: "32px",
        width: "50%",
        padding: "16px 0",
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        gap: "24px",
    },
}));
