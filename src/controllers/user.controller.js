import express from 'express'

import userService from '../services/user.service'

const router = express.Router()

router.get('/:id', getMyProfile)
router.post('/signIn', signIn)
router.post('/signUp', signUp)

function signIn(req, res, next) {
  userService
    .signIn(req.body)
    .then(user => res.json(user))
    .catch(err => next(err))
}

function signUp(req, res, next) {
  userService
    .signUp(req.body)
    .then(user => res.json(user))
    .catch(err => next(err))
}

function getMyProfile(req, res, next) {
  const bearerToken = req.headers.authorization.split(' ')
  
  userService
    .getMyProfile(bearerToken[1], req.params.id)
    .then(user => res.json(user))
    .catch(err => next(err))
}

export default router