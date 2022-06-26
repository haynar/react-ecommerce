import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

import {makeStyles} from 'tss-react/mui';
import {
    Checkbox,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";

import ProductPreview, {ProductPreviewSkeleton} from "./ProductPreview";

const ProductListing: React.FC = () => {
    const {category} = useParams();
    const {classes} = useStyles();

    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryList, setCategoryList] = React.useState<string[]>([]);
    const [productList, setProductList] = React.useState<Product[]>([]);
    const [filter, setFilter] = React.useState<{ category: string | null }>({category: null});

    const loadCategoryList = React.useCallback(() => {
        axios.get('https://fakestoreapi.com/products/categories')
            .then((res) => {
                setCategoryList(res.data);
            });
    }, []);

    const loadProductList = React.useCallback(() => {
        setIsLoading(true);
        axios.get(`https://fakestoreapi.com/products${filter.category ? `/category/${filter.category}` : ''}`)
            .then((res) => {
                setProductList(res.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [filter]);

    const handleCategoryToggle = React.useCallback((cat: string) => () => {
        setFilter({
            ...filter,
            category: cat === filter.category ? null : cat,
        });
    }, [filter]);

    React.useEffect(() => {
        loadCategoryList();
    }, []);

    React.useEffect(() => {
        loadProductList();
    }, [loadProductList]);

    return (
        <div className={classes.root}>
            <div className={classes.filter}>
                <div className={classes.filterSection}>
                    <Typography variant="h6">Category</Typography>
                    <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                        {categoryList.map((value) => {
                            const labelId = `category-label-${value}`;

                            return (
                                <ListItem key={value} disablePadding>
                                    <ListItemButton onClick={handleCategoryToggle(value)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={filter.category === value}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{'aria-labelledby': labelId}}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={`${value[0].toUpperCase()}${value.substring(1)}`} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            </div>
            <div className={classes.contentWrapper}>
                <Typography variant="h4" sx={{marginBottom: '16px'}}>Products{!isLoading ? ` (${productList.length})` : ''}</Typography>
                <div className={classes.contentList}>
                    {isLoading ? (
                        <>
                            <ProductPreviewSkeleton />
                            <ProductPreviewSkeleton />
                            <ProductPreviewSkeleton />
                            <ProductPreviewSkeleton />
                        </>
                    ) : productList.map((p) => (
                        <ProductPreview key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductListing;

const useStyles = makeStyles()(() => ({
    root: {
        display: "flex",
        padding: '24px 0',
    },
    filter: {
        display: "flex",
        flexDirection: "column",
        minWidth: "250px",
        padding: '0 24px',
    },
    filterHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "16px",
    },
    filterSection: {},
    contentWrapper: {
        padding: '0 24px',
    },
    contentList: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "2em",
    },
}));
