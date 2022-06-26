import React from 'react';
import {makeStyles} from "tss-react/mui";
import {Skeleton, Tooltip, Typography} from "@mui/material";
import ProductRating from "./ProductRating";
import {grey} from "@mui/material/colors";

const ProductPreview: React.FC<{
    product: Product,
}> = (props) => {
    const { product } = props;
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.imageWrapper}>
                <div className={classes.image} style={{ backgroundImage: `url('${product.image}')` }} />
            </div>
            {product.title.length>35 ? (
                <Tooltip title={product.title}>
                    <Typography variant="h6">{product.title.substring(0, 35)}…</Typography>
                </Tooltip>
            ) : (
                <Typography variant="h6">{product.title}</Typography>
            )}
            <ProductRating rating={product.rating} />
            <Typography variant="h6">€{product.price.toFixed(2)}</Typography>
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
        alignItems: "flex-start",
        gap: "8px",
        flex: "0 0 260px",
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
    }
}));
