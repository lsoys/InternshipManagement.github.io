import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
    useEffect(() => {
        document.getElementById("home").click();
    }, [])
    return <>
        <h1>HOME</h1>
        <NavLink id="home" to="/works/"></NavLink>
    </>
}