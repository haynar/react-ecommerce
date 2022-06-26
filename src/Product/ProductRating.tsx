import React from 'react';
import {makeStyles} from "tss-react/mui";
import clsx from 'clsx';

import StarIcon from '@mui/icons-material/Star';
import type {SvgIconTypeMap} from "@mui/material/SvgIcon/SvgIcon";
import {amber, grey} from "@mui/material/colors";
import {Typography} from "@mui/material";

const ProductRating: React.FC<{ rating: ProductRating, fontSize?: SvgIconTypeMap['props']['fontSize'] }> = (props) => {
    const { rating, fontSize = "medium" } = props;
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.starWrapper}>
                <div className={classes.row}>
                    {[1,2,3,4,5].map((_, idx) => (
                        <StarIcon key={idx} fontSize={fontSize} sx={{ color: grey[300] }}/>
                    ))}
                </div>
                <div className={clsx(classes.row, classes.filled)} style={{ width: `${rating.rate/5*100}%` }}>
                    {[1,2,3,4,5].map((_, idx) => (
                        <StarIcon key={idx} fontSize={fontSize} sx={{ color: amber[500] }}/>
                    ))}
                </div>
            </div>
            <Typography variant="body2">({rating.count})</Typography>
        </div>
    );
};

export default ProductRating;

const useStyles = makeStyles()(() => ({
    root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
    },
    starWrapper: {
        position: "relative",
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    filled: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        whiteSpace: "nowrap",
        overflow: 'hidden',
    },
}));
