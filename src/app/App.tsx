import React, {useEffect} from "react"
import "./App.css"
import {TodolistsList} from "../features/TodolistsList/TodolistsList"
import {useAppDispatch, useAppSelector} from "./store"
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import {Menu} from "@mui/icons-material";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar"
import {Navigate, Route, Routes} from "react-router-dom"
import {Login} from "../features/Login/Login";
import {CircularProgress} from "@mui/material";
import {initializedAppTC} from "./app-reducer";
import Button from "@mui/material/Button";
import {logoutTC} from "../features/Login/auth-reducer";


function App() {
    const dispatch = useAppDispatch()

    const status = useAppSelector((state) => state.app.status)
    const isInitialize = useAppSelector((state) => state.app.isInitialize)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialize) {
        return <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color={"inherit"} onClick={logoutHandler}>LOGOUT</Button>}
                </Toolbar>
                {status === "loading" && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistsList/>}></Route>
                    <Route path={"/login"} element={<Login/>}></Route>
                    <Route path="/404" element={<h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path="/*" element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
