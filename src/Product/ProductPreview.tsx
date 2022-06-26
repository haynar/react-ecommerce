import React from 'react';
import {makeStyles} from "tss-react/mui";
import {Skeleton} from "@mui/material";

const ProductPreview: React.FC<{
    product: Product,
}> = () => {
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
        </div>
    );
};

export const ProductPreviewSkeleton: React.FC = () => {
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <Skeleton variant="rectangular" animation="wave" width={300} height={200} />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
        </div>
    );
};

export default ProductPreview;

const useStyles = makeStyles()(() => ({
    root: {
        flex: "0 0 300px",
    },
}));
