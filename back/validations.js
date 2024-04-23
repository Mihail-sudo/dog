import { body } from 'express-validator'


export const loginValidator = [
    body('email', 'email is uncorrect').isEmail(),
    body('password', 'password should be longer than 5 letters').isLength({ min: 5 }),
]

export const registerValidator = [
    body('email', 'email is uncorrect').isEmail(),
    body('password', 'password should be longer than 5 letters').isLength({ min: 5 }),
    body('fullName', 'type your name').isLength({ min: 2 }),
    body('avatarUrl', 'uncorrect url for avatar').optional().isURL(),
]

export const postCreateValidator = [
    body('title', 'input the name of post').isLength({ min: 3 }).isString(),
    body('text', 'input the text').isLength({ min: 5 }).isString(),
    body('tags', 'tags').optional().isString(),
    body('imageUrl', 'uncorrect url for image').optional().isString(),
]
