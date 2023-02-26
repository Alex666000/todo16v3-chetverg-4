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
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

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
            // alert(JSON.stringify(values));
            dispatch(loginTC(values))
        },
    })

    if (isLoggedIn) {
        <Navigate to={"/"}/>
    }

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
                        {formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   name={"password"}
                                   onChange={formik.handleChange}
                                   value={formik.values.password}
                        />
                        {formik.errors.password ? <div style={{color: "red"}}>{formik.errors.password}</div> : null}

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
- собрали данные в форму - потом диспатчим эти данные - диспатчим санку - санка получает эти данные и отправляет их на сервер
- плясать надо от АПИ-шке - смотреть какие данные оно ждет(какие поля при логинизации - см докум-ию, что там написано на ендпоинте login)
- логинизация = post запрос всегда --- каптча проверяет робот мы или нет... Не всегда требуется
- для каждого сайта свои куки - они строго для домена -браузер для домена у себя сохраняет куку - она летит с каждым запросом на сервер
подтверждая кто я
- делаем auth-reducer.ts
- создаем на апи отдельный объект по работет с авторизацией, используем патерн object-params - объединяем много параметров в обхект и передаем объект целиком
для этого создаем тип сначала LoginParamsType - далее принимаем объект такого типа - тправляем весь объект без скобок
что к нам пришел data на сервер - и по хорошему надо authAPI  проверить например с эмитировать в сторибуке запрос
-  идем в санку loginTC и делаем логин запрос: принимаеи с UI эту data - покажем крутилку, которую санка задиспатчит, и тд....передаем дату в authAPI
делаа в формике диспатчим санку
- все написали начало логинизации === в браузере создалась кука после ответа от сервера что все успешно
- но мы с кукой не работаем напрямую - нашему приложению надо узнать что мы залогинелись - сделать редирект
чтобы визуально в реакте отреагировать на то что мы залогинены - РЕДИРЕКТ это тоже часть разметки -
любые визуальные изменения что происходят только если изменился state - значит в санке надо установить
что-то в стейт галочку(переключалку) которая скажет что мы теперь залогинены) --- значит в какой-о редюсер надо добавить эту галочку
Залогинен я или нет это состояние самого Арр - поэтому это состояние храним в app-reducer - это настройка всего приложения -
но можно и в логин редюсере все таки оставить - создаем такое свойство в стейте там: isLoggedIn --  будем менять это состояние с помощью АС
- делаем кейс и добавляем в комбайнредюсер и переименуем loginReducer в authReducer
- и теперь если в then if (res.data.resultCode === 0) то теперь диспатчим что залогинены сами в себя
- на странице Логин прочитаем это значение залогинены ли? И если залогинены делаем редирект не на форму логина а на главную
страницу,
- после перезагрузке надо понимать мы залогинены или нет. Кука то существует даже после перезагрузке - но система не знает о том что я залогинен
-надо проверить залогинены или нет? Наличие куки не говорит о том что мы залогинены - залогиненость проверяется
ПРАВИЛЬНОСТЬЮ КУКИ - она должна быть (как паспорт) или токен... при загрузке нашего Арр надо взять какой-нибудь запрос на сервак
(если токен лежит в локал сторадже мы его цепляем к запросу...) - при каждом старте приложения(загрузке или перезагрузке)
и говорим: "Кто я такой? Залогинен я или нет? " Сервер вернет ответ кто я такой --- в документации есть такой эндпоинт
/auth/me - отправляем get запрос сюда --- и если кука существует она цеплячется и /auth/me возвращает ответ кто я такой
если сделаю get запрос сюда же не имея куки - то ошибка "Вы не автаризованы". Значит на старте приложения делаем запрос сюда
и спрашиваем залогинен я или нет?
- со старта у нас false что не залогиинены - попадаем на стр Логина - но потом  в фоне делаем запрос и сервер говорит
что мы залогинены и нас редирекнет на главную стр -  и получаются тупые дерганья: хочу свои туду посмотреть а меня на логин редерекнет потом
а потом обратно на туду редирекнет, не круто! Сначала надо показать крутилку - сервер не знает залогенен я или нет
и он просто делает проверку - инициализирует Арр,в качестве инициализации у нас один процесс: проверка залогинены мы или нет
более широкое понятие инициализации? дефолтная тема,язык,настройки...
НАШЕ ПРИЛОЖЕНИЕ - МОЖЕТ БЫТЬ В СОСТОЯНИИ: ПРОИНИЦИАЛИЗИРОВАНО ИЛИ НЕТ! Идем в app-reducer: initialized заводим...
пишем логику изменения initialized c false на true
- Инициализация много всяких запросов в том числе асинхронных - поэтому делаем санку "Проинициализируй АРР" -- initializedAppTC
диспатчим эту санку в Арр.tsx -- и ставим предохранитель - если не проинициализированы покажем крутилку из MUI
CircularProgress - по умолчанию initialized === false - поэтому увидим эту крутилку - отодвинем в середину ее
меняем руками зависимость UI от стейта редюсера (тестируем так..) -- теперь в нужный момент надо заменить на тру
когда мы проинициализируемся - пишем в редюсере логику изменения -- пишем санку которая будет заниматься инициализацией
она должна просто отправить запрос на сервер me и спросить залогинены мы или нет? Идем в АПИ иопределим эту логику get запрос
теперь в санке логику делаем: initializedAppTC --- диспатчим санку эту в Арр.tsx -- диспатчим единственный раз когда приложение вмонтируется

TodolistsList:

 useEffect(() => {
        dispatch(initializedAppTC)
    },[])

- делаем предохрани тель чтобы не могли попасть на Тулдулист если не залогинены редиректим на логин
 if (!isLoggedIn){
        <Navigate to={'login'}/>
    }

и не загружаем тудулисты если
 useEffect(() => {
        const thunk = fetchTodolistsTC()
        dispatch(thunk)

        if (!isLoggedIn) {
            return
        }
    }, [])

ЛОГИН ФЛОУ КРАТКО: видим крутилку изначально - инициализируем Арр(санку отправляем) в эффекте - когда Арр проинициализируется мы попытаемся попасть
на главную струницу TodolistsList со списком тудулистов но из isLoggedIn === false(мы не залогинены) поэтому редирекнет на Логин форму - и теперь когда залогинемся
и попадаем обратно к тудулистам и можем тут быть - потом когда обновим страницу так как кука у нас есть  и auth/me скажет что мы залогинены isLoggedIn === true
то мы окажемся на списке тудулистов а если попытаемся в URL ввести /login - нас выкинет обратно на тудулисты т к мы залогинены

- ВЫЛОГИНЕВАНИЕ:
- сделаем кнопку logout в АРР.tsx
-  т к колбек передаем logoutHandler то делаем для крутой кнопки Button useCallback
- делаем апишку для вылогиневание logout
- чтобы из UI из компоненты сделать запрос на сервер диспатчим санку logoutTC где наоборото меняем
dispatch(setIsLoggedInAC(false))



 */