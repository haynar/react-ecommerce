import {atom} from "recoil";

export type CartState = {
    count: number;
    items: { [key: string]: number}
}

export type FavoritesState = string[];


export const cartState = atom<CartState>({
    key: "cart",
    default: {
        count: 0,
        items: {},
    },
});

export const favoritesState = atom<FavoritesState>({
    key: "favorites",
    default: [],
});
