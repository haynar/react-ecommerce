import React from 'react';
import {makeStyles} from "tss-react/mui";
import {
    Button,
    Typography
} from "@mui/material";
import {useRecoilState} from "recoil";
import {favoritesState, FavoritesState, productCacheState, ProductCacheState} from "./store";
import {grey} from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';

const CartView: React.FC = () => {
    const {classes} = useStyles();
    const [favorites, setFavorites] = useRecoilState<FavoritesState>(favoritesState);
    const [productCache] = useRecoilState<ProductCacheState>(productCacheState);

    const deleteFromFavorites = React.useCallback((pid: string) => () => {
        const newFavorites = [...favorites];
        const idx = favorites.indexOf(pid);
        newFavorites.splice(idx, 1);
        setFavorites(newFavorites);
    }, [favorites, setFavorites]);

    if (favorites.length === 0) {
        return (
            <div className={classes.root}>
                <Typography variant="h4" sx={{textAlign: "center", paddingTop: "1em"}}>Your don't have any
                    favorites.</Typography>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            {favorites.map((pid: string) => {
                const product = productCache[pid];

                return (
                    <div key={pid} className={classes.item}>
                        <div className={classes.image} style={{backgroundImage: `url('${product.image}')`}} />
                        <div className={classes.details}>
                            <Typography variant="body1">{product.title}</Typography>
                            <Typography variant="body2">€{product.price.toFixed(2)}</Typography>
                            <Typography variant="body2">{product.description}</Typography>
                            <div className={classes.row} style={{marginTop: "16px", marginLeft: "-4px"}}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                    onClick={deleteFromFavorites(pid)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CartView;

const useStyles = makeStyles()(() => ({
    root: {
        maxWidth: "960px",
        margin: "0 auto",
    },
    item: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "12px",
        padding: "12px",
        borderBottom: `solid 1px ${grey[400]}`,
    },
    image: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "contain",
        width: "60px",
        height: "100px",
    },
    details: {
        flex: 1,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
}));
