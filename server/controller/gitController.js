// Service
const gitService = require("../service/gitService");

// Create Empty Object
const gitController = {};

gitController.get = async (req, res) => {
    try {
        // Get Route Parameters
        const organization = req.params.org;
        const repository = req.params.repo;
        const statistic = req.params.stat;

        // Get Statistics
        const repositoryStatistics = await gitService.getRepositoryStatistics(organization, repository, statistic);

        // Return Response CSV
        res.setHeader("Content-disposition", `attachment; filename=${statistic}.csv`);
        res.set("Content-Type", "text/csv");
        res.status(200).send(repositoryStatistics);
    } catch (err) {
        // Log Error
        console.log(err);

        if (err.message === "404") {
            // Error Resource Not Found
            res.status(404).send();
        }

        // Error Bad Request
        res.status(400).send();
    }
};

module.exports = gitController;

console.log("Executing Controller: gitController.js ...");
console.log("");
