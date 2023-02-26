import React, {useCallback, useEffect} from "react"
import "./App.css"
import {TodolistsList} from "../features/TodolistsList/TodolistsList"
import {AppRootStateType, useAppDispatch, useAppSelector} from "./store"
import {initializedAppTC, RequestStatusType} from "./app-reducer"
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import {Menu} from "@mui/icons-material";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar"
import {Navigate, Route, Routes} from "react-router-dom"
import {Login} from "../features/Login/Login";
import CircularProgress from "@mui/material/CircularProgress";
import {logoutTC} from "../features/Login/auth-reducer";


function App() {
    const dispatch = useAppDispatch()

    const status = useAppSelector((state) => state.app.status)
    const isInitialized = useAppSelector((state) => state.app.initialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    useEffect(() => {
        dispatch(initializedAppTC)
    },[])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    },[])

    }

    if (!isInitialized) {
        return <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress />
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
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}

                </Toolbar>
                {status === "loading" && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistsList/>}></Route>
                    <Route path={"/login"} element={<Login/>}></Route>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="/*" element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
