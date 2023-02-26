import React from "react"
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useFormik} from "formik";

export const Login = () => {
    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            console.log(values)

            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = "Bad email"
            }
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address"
            }
            if (values.password.length < 3) {
                errors.password = "Must be 3 characters or less";
            }
            return errors
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    })

    return <Grid container justifyContent={"center"}>
        <Grid item justifyContent={"center"}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={"https://social-network.samuraijs.com/"}
                               target={"_blank"}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                                   name={"email"}
                                   onChange={formik.handleChange}
                                   value={formik.values.email}
                        />
                        {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   name={"password"}
                                   onChange={formik.handleChange}
                                   value={formik.values.password}
                        />
                        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}

                        <FormControlLabel label={"Remember me"} control={<Checkbox
                            name={"rememberMe"}
                            onChange={formik.handleChange}
                            checked={formik.values.rememberMe}
                        />}/>
                        <Button type={"submit"} variant={"contained"} color={"primary"}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>

            </form>
        </Grid>
    </Grid>
}

/*
- собрали данные в форму потом диспатчим эти данные - диспатчим санку - санка получает эти данные и отправляет их на сервер
- плясать надо от АПИ-шке - смотреть какие данные оно ждет(какие поля при логинизации - см докум-ию, что там написано на ендпоинте login)
- логинизация = post запрос всегда --- каптча проверяет робот мы или нет... Не всегда требуется
- для каждого сайта свои куки - они строго для домена -браузер для домена у себя сохраняет куку - она летит с каждым запросом на сервер
подтверждая кто я
- делаем auth-reducer.ts
- создаем на апи отдельный объект по работет с авторизацией, используем патерн object-params - объединяем много параметров в обхект и передаем объект целиком
для этого создаем тип сначала LoginParamsType - далее принимаем объект такого типа
 */