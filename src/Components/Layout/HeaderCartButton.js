import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = props => {
    const [btnIsHighlighted,setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    
    const {items} = cartCtx;

    // reduce(()=>{},INITIAL_VALUE); it's a built-in method that transforms an array of data into a single value.
    // Here currentItem will store the result that is returned from the previous execution.
    const numberOfCartItems = items.reduce(( currentItem, item)=>{
        return currentItem + item.amount;
    },0);


    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;

    useEffect(()=>{
        if (items.length === 0) {
            return;
        }

        setBtnIsHighlighted(true);

        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false);
        },300);

        return () => {
            clearTimeout(timer);
        };
        
    },[items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;