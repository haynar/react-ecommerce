import React from 'react';
import clsx from "clsx";
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import {useRecoilState} from "recoil";
import {Button, Skeleton, Tooltip, Typography} from "@mui/material";
import ProductRating from "./ProductRating";
import {grey} from "@mui/material/colors";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {CartState, cartState} from "../store";

const ProductPreview: React.FC<{
    product: Product,
}> = (props) => {
    const { product } = props;
    const { classes } = useStyles();
    const [cart, setCart] = useRecoilState<CartState>(cartState);

    const addToCart = React.useCallback((id: string) => () => {
        setCart({
            ...cart,
            count: cart.count + 1,
            items: {
                ...cart.items,
                [id]: (cart.items[id] || 0) + 1,
            }
        })
    }, [cart, setCart]);

    return (
        <div className={classes.root}>
            <Link to={`/product/${product.id}`} className={classes.wrapper}>
                <div className={classes.imageWrapper}>
                    <div className={clsx(classes.image, 'product-image')} style={{ backgroundImage: `url('${product.image}')` }} />
                </div>
                {product.title.length>35 ? (
                    <Tooltip title={product.title}>
                        <Typography variant="h6" className={classes.title}>{product.title.substring(0, 35).trim()}…</Typography>
                    </Tooltip>
                ) : (
                    <Typography variant="h6" className={classes.title}>{product.title}</Typography>
                )}
                <ProductRating rating={product.rating} />
                <Typography variant="h6">€{product.price.toFixed(2)}</Typography>
            </Link>
            <Button variant="contained" startIcon={<AddShoppingCartIcon />} fullWidth onClick={addToCart(product.id)}>Add to Cart</Button>
        </div>
    );
};

export const ProductPreviewSkeleton: React.FC = () => {
    const { classes } = useStyles();

    return (
        <div className={classes.skeletonRoot}>
            <Skeleton variant="rectangular" animation="wave" width={260} height={250} />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
        </div>
    );
};

export default ProductPreview;

const useStyles = makeStyles()(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flex: "0 0 260px",
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",

        "&:hover": {
            ".product-image": {
                transform: "scale(1.1)",
            },
        },
    },
    skeletonRoot: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    imageWrapper: {
        width: "100%",
        padding: "16px",
        border: `solid 1px ${grey[200]}`,
        borderRadius: "6px",
        boxSizing: "border-box",
    },
    image: {
        width: "100%",
        height: "220px",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        transform: "scale(1)",
        transition: "transform ease 0.2s",
    },
    title: {
        minHeight: "64px",
    }
}));
