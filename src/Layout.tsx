import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import {Badge, IconButton, styled} from "@mui/material";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {ReactComponent as Logo} from './logo.svg';

import {blue} from "@mui/material/colors";

const NavIconButton = styled(IconButton)(({theme}) => ({
    color: theme.palette.getContrastText(blue[500]),
}));

const Layout: React.FC = () => {
    const {classes} = useStyles();

    return (
        <main>
            <nav className={classes.nav}>
                <Link className={classes.navLink} to="/">
                    <Logo className={classes.logo} />
                    <span>E-Shopper</span>
                </Link>
                <div className={classes.navActions}>
                    <NavIconButton aria-label="favorites">
                        <Badge badgeContent={0} color="secondary">
                            <FavoriteBorderIcon fontSize="medium" />
                        </Badge>
                    </NavIconButton>
                    <NavIconButton aria-label="shopping cart">
                        <Badge badgeContent={0} color="secondary">
                            <ShoppingCartIcon fontSize="medium" />
                        </Badge>
                    </NavIconButton>
                </div>
            </nav>
            <div className={classes.content}>
                <Outlet />
            </div>
        </main>
    );
};

export default Layout;

const useStyles = makeStyles()(() => ({
    nav: {
        display: "flex",
        justifyContent: "space-between",
        color: "#ffffff",
        backgroundColor: blue[500],
        padding: "8px 24px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
    },
    navLink: {
        display: "inline-flex",
        textDecoration: "none",
        color: "inherit",
        alignItems: "center",
        gap: "8px",
        fontWeight: "bold",
        fontSize: "1.5em",
    },
    logo: {
        fill: "#ffffff",
        width: "48px",
        height: "48px",
    },
    navActions: {
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    content: {
        maxWidth: "1280px",
        margin: "0 auto",
        marginTop: "64px",
    },
}));
