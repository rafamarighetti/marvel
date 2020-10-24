import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";

import Heroes from './pages/heroes'
import Hero from './pages/hero'

function Routes() {
    return(
        <BrowserRouter>
            <Route exact component={Heroes} path="/" />
            <Route exact component={Hero} path="/hero/:id" />
        </BrowserRouter>
    )
} 
 
export default Routes; 