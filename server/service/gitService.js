// Utility
const gitUtility = require("../utility/gitUtility");

// Create Empty Object
const gitService = {};

gitService.getRepositoryStatistics = async (organization, repository, statistic) => {
    let csv;
    if (statistic === "contributors") {
        // GitHub API, Repositories Contributors
        const contributors = await gitUtility.fetchContributors(organization, repository);

        if (contributors.data === undefined) {
            throw new Error(404);
        }

        // Contributors to CSV
        csv = gitUtility.contributorsToCSV(contributors.data);
    } else if (statistic === "commit_activity") {
        // GitHub API, Repositories Commit Activity
        const commitActivity = await gitUtility.fetchCommitActivity(organization, repository);

        if (commitActivity.data === undefined) {
            throw new Error(404);
        }

        // Commit Activity to CSV
        csv = gitUtility.commitActivityToCSV(commitActivity.data);
    } else if (statistic === "code_frequency") {
        // GitHub API, Repositories Code Frequency
        const codeFrequency = await gitUtility.fetchCodeFrequency(organization, repository);

        if (codeFrequency.data === undefined) {
            throw new Error(404);
        }

        // Code Frequency to CSV
        csv = gitUtility.codeFrequencyToCSV(codeFrequency.data);
    } else if (statistic === "participation") {
        // GitHub API, Repositories Participation
        const participation = await gitUtility.fetchParticipation(organization, repository);

        if (participation.data === undefined) {
            throw new Error(404);
        }

        // Participation to CSV
        csv = gitUtility.participationToCSV(participation.data);
    } else if (statistic === "punch_card") {
        // GitHub API, Repositories Punch Card
        const punchCard = await gitUtility.fetchPunchCard(organization, repository);

        if (punchCard.data === undefined) {
            throw new Error(404);
        }

        // Punch Card to CSV
        csv = gitUtility.punchCardToCSV(punchCard.data);
    }
    return csv;
};

module.exports = gitService;

console.log("Executing Service: gitService.js ...");
console.log("");
