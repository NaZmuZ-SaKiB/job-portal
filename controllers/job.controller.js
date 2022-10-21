const { createJobService, findJobByManagerService, updateJobByIdService, getAllJobsService, getJobByIdService, applyForJobService } = require("../services/job.service")

exports.getAllJobs = async (req, res, next) => {
    try {
        const filters = {...req.query}

        // Sort, Page, Limit Exclude
        const excludeFields = ['sort', 'page', 'limit', 'fields']
        excludeFields.forEach(field => delete filters[field])

        const jobs = await getAllJobsService(filters)

        res.status(200).json({
            status: "success",
            message: "successfully got the jobs",
            data: jobs
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "could not get the jobs",
            error
        })
    }
}

exports.getJobById = async (req, res, next) => {
    try {
        const jobId = req.params.id

        const job = await getJobByIdService(jobId)

        res.status(200).json({
            status: "success",
            message: "successfully got the job",
            data: job
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "could not get the job",
            error
        })
    }
}

exports.applyForJob = async (req, res, next) => {
    try {
        const jobId = req.params.id
        const job = await getJobByIdService(jobId)

        const userId = req.user.id

        const now = new Date()
        const deadline = new Date(job.deadline)

        if(now > deadline){
            return res.status(500).json({
                status: "fail",
                message: "Deadline for this job is over"
            })
        }

        if(job.candidates.includes(userId)){
            return res.status(500).json({
                status: "fail",
                message: "already applied for this job"
            })
        }

        const response = await applyForJobService(jobId, userId)

        res.status(200).json({
            status: "success",
            message: response
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "could not apply for the job",
            error
        })
    }
}

exports.createJob = async (req, res, next) => {
    try {
        const jobInfo = req.body
        if(!req.user.role === 'admin'){
            if(!req.body?.hiringManager){
                jobInfo.hiringManager = req.user.id
            }
        }
        const job = await createJobService(jobInfo)

        res.status(200).json({
            status: "success",
            message: "Successfully created a job",
            data: job
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Could no create a job",
            error
        })
    }
}

exports.findJobByManager = async (req, res, next) => {
    try {
        const jobs = await findJobsByManagerService(req.user.id)

        res.status(200).json({
            status: "success",
            message: "Successfully got the jobs",
            data: jobs
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Could not get the jobs",
            error
        })
    }
}

exports.findJobByManager = async (req, res, next) => {
    try {
        const jobId = req.params.id
        const job = await findJobByManagerService(jobId, req.user.id)

        res.status(200).json({
            status: "success",
            message: "Successfully got the job",
            data: job
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Could not get the job",
            error
        })
    }
}

exports.updateJobById = async (req, res, next) => {
    try {
        const jobId = req.params.id
        const job = await updateJobByIdService(jobId, req.body)

        res.status(200).json({
            status: "success",
            message: "Successfully updated the job",
            data: job
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Could not update the job",
            error
        })
    }
}