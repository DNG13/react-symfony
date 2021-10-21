import React from "react";
import {render} from "react-dom";
import RepLogApp from './RepLog/RepLogApp';

// console.log(<RepLogApp/>);
const shouldShowHeart = false;
render(
    <RepLogApp
        withHeart={shouldShowHeart}
        {...window.REP_LOG_APP_PROPS}
    />,
    document.getElementById('lift-stuff-app')
);
