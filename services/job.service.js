const User = require('../models/user.model')
const Job = require('../models/job.model')

exports.getAllJobsService = async (filters) => {
    const jobs = await Job.find(filters)
    return jobs;
}

exports.getJobByIdService = async (jobId) => {
    const job = await Job.findById(jobId).populate('hiringManager')
    job.hiringManager.password = null
    return job;
}

exports.applyForJobService = async (jobId, userId) => {
    await Job.updateOne({_id: jobId}, {$push: {candidates: userId}})
    await User.updateOne({_id: userId}, {$push: {appliedJobs: jobId}})

    return "Successfully Applied"
}

exports.createJobService = async (jobInfo) => {
    const job = await Job.create(jobInfo)
    return job;
}

exports.findJobsByManagerService = async (managerId) => {
    const jobs = await Job.find({hiringManager: managerId})
    return jobs;
}

exports.findJobByManagerService = async (jobId, managerId) => {
    const job = await Job.findOne({_id: jobId, hiringManager: managerId}).populate('candidates')
    return job;
}

exports.updateJobByIdService = async (jobId, query) => {
    const job = await Job.updateOne({_id: jobId}, {$set: query}, {runValidators: true})
}