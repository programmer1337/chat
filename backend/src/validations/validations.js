import {body} from "express-validator";

export const registerValidation = [
    body("login")
        .isLength({
            min: 3,
            max: 30,
        }).withMessage("Логин может быть от 3 до 30 символов"),
    body("password", "Пароль может должен быть от 6 до 64 символов")
        .isLength({
            min: 6,
            max: 64,
        }),
    body("firstName", "Не подходящее имя")
        .isLength({
            min:2,
            max:102,
        }).withMessage('Вряд ли ваше имя ')
        .matches(
            /^[A-Za-zА-Яа-я\s]+$/
        ).withMessage('Имя должно состоять из букв. Ваше '),
    body("lastName", "Не подходящая фамилия")
        .isLength({
            min:2,
            max:102,
        }).withMessage('Вряд ли ваша фамилия ')
        .matches(
            /^[A-ZА-Яa-zа-я\s]+$/
        ).withMessage('Фамилия должно состоять из букв. Ваша ')
]

export const loginValidation = [
    body("login", "Неверное имя пользователя")
        .isLength({
            min: 3,
            max: 30,
        }),
    body("password", "Неверный пароль")
        .isLength({
            min: 6,
            max: 64,
        }),
]
