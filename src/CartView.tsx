import React from 'react';
import {makeStyles} from "tss-react/mui";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Tooltip,
    Typography
} from "@mui/material";
import {useRecoilState} from "recoil";
import {CartState, cartState, productCacheState, ProductCacheState} from "./store";
import {grey} from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';

const CartView: React.FC = () => {
    const { classes } = useStyles();
    const [cart, setCart] = useRecoilState<CartState>(cartState);
    const [productCache] = useRecoilState<ProductCacheState>(productCacheState);

    let totalAmount = 0;

    const handleCountChange = React.useCallback((pid: string) => (event: SelectChangeEvent) => {
        const newCart = {
            ...cart,
            items: {
                ...cart.items,
                [pid]: Number.parseInt(event.target.value),
            }
        };

        newCart.count = Object.values(newCart.items).reduce((p, v) => p + v, 0);

        setCart(newCart);
    }, [cart, setCart]);

    const deleteFromCart = React.useCallback((pid: string) => () => {
        const newCart = {...cart, items: {...cart.items}};
        newCart.count -= newCart.items[pid];
        delete newCart.items[pid];

        setCart(newCart);
    }, [cart, setCart]);

    if (Object.keys(cart.items).length === 0) {
        return  (
            <div className={classes.root}>
                <Typography variant="h4" sx={{ textAlign: "center", paddingTop: "1em" }}>Your cart is empty.</Typography>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            {Object.keys(cart.items).map((pid: string) => {
                const product = productCache[pid];
                const itemCount = cart.items[pid];
                const itemTotalPrice = product.price * itemCount;

                totalAmount += itemTotalPrice;

                return (
                    <div key={pid} className={classes.item}>
                        <div className={classes.image} style={{ backgroundImage: `url('${product.image}')` }} />
                        <div className={classes.details}>
                            <div className={classes.row}>
                                {product.title.length > 50 ? (
                                    <Tooltip title={product.title}>
                                        <Typography variant="body1">{product.title.substring(0, 50).trim()}…</Typography>
                                    </Tooltip>
                                ) : (
                                    <Typography variant="body1">{product.title}</Typography>
                                )}
                                <Typography variant="h6">€{itemTotalPrice.toFixed(2)}</Typography>
                            </div>
                            <Typography variant="body2">€{product.price.toFixed(2)}</Typography>
                            <div className={classes.row} style={{marginTop: "16px", marginLeft: "-4px"}}>
                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                    <InputLabel id={`item-count-select-${pid}`}>Count</InputLabel>
                                    <Select
                                        labelId={`item-count-select-${pid}`}
                                        id={`item-count-select-${pid}`}
                                        value={`${itemCount}`}
                                        label="Count"
                                        onChange={handleCountChange(pid)}
                                    >
                                        {[1,2,3,4,5,6,7,8,9,10].map((i) => (<MenuItem key={i} value={i}>x{i}</MenuItem>))}
                                    </Select>
                                </FormControl>

                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                    onClick={deleteFromCart(pid)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            })}
            <Typography variant="h5" sx={{ textAlign: "right", marginTop: "8px" }}>Total: {totalAmount.toFixed(2)}</Typography>
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
        alignItems: "center",
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
    totalRow: {
        textAlign: "right",
    },
}));
