const express = require('express')
const controller = require('../controllers/job.controller')
const verifyToken = require('../middlewares/verifyToken')
const authorization = require('../middlewares/authorization')

const router = express.Router()

router.get('/jobs', controller.getAllJobs)
router.get('/jobs/:id', controller.getJobById)
router.get('/jobs/:id/apply',verifyToken, authorization("candidate"), controller.applyForJob)

router.post('/jobs', verifyToken, authorization("hiring-manager", "admin"),  controller.createJob)
router.patch('/jobs/:id', verifyToken, authorization("hiring-manager", "admin"),  controller.updateJobById)

router.get('/manager/jobs', verifyToken, authorization("hiring-manager"),  controller.findJobByManager)
router.get('/manager/jobs/:id', verifyToken, authorization("hiring-manager"),  controller.findJobByManager)

module.exports = router