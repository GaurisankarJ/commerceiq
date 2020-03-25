// Axios Promised Based Http Client
const axios = require("axios");
// JSON to CSV
const { Parser, transforms: { unwind } } = require("json2csv");

// Create Empty Object
const gitUtility = {};

// Fetch Repository Contributors from GitHub API
gitUtility.fetchContributors = async (organization, repository) => {
    try {
        return await axios.get(
            `https://api.github.com/repos/${organization}/${repository}/stats/contributors`
        );
    } catch (error) {
        return error;
    }
};

// Fetch Repository Commit Activity from GitHub API
gitUtility.fetchCommitActivity = async (organization, repository) => {
    try {
        return await axios.get(
            `https://api.github.com/repos/${organization}/${repository}/stats/commit_activity`
        );
    } catch (error) {
        return error;
    }
};

// Fetch Repository Code Frequency from GitHub API
gitUtility.fetchCodeFrequency = async (organization, repository) => {
    try {
        return await axios.get(
            `https://api.github.com/repos/${organization}/${repository}/stats/code_frequency`
        );
    } catch (error) {
        return error;
    }
};

// Fetch Repository Participation from GitHub API
gitUtility.fetchParticipation = async (organization, repository) => {
    try {
        return await axios.get(
            `https://api.github.com/repos/${organization}/${repository}/stats/participation`
        );
    } catch (error) {
        return error;
    }
};

// Fetch Repository Punch Card from GitHub API
gitUtility.fetchPunchCard = async (organization, repository) => {
    try {
        return await axios.get(
            `https://api.github.com/repos/${organization}/${repository}/stats/punch_card`
        );
    } catch (error) {
        return error;
    }
};

// Get Object Keys
gitUtility.getKeys = (obj, prefix = "") => Object.keys(obj).reduce((res, el) => {
    if (Array.isArray(obj[el])) {
        return res;
    } else if (typeof obj[el] === "object" && obj[el] !== null) {
        return [...res, ...gitUtility.getKeys(obj[el], `${prefix}${el}.`)];
    } else {
        return [...res, prefix + el];
    }
}, []);

// Contributors to CSV
gitUtility.contributorsToCSV = (contributors) => {
    const fields = gitUtility
        .getKeys(contributors[0])
        .concat(["weeks.w", "weeks.a", "weeks.d", "weeks.c"]);

    const transforms = [unwind(["weeks", "weeks.weeks"])];
    const options = { fields, transforms };

    try {
        const parser = new Parser(options);
        const csv = parser.parse(contributors);

        return csv;
    } catch (err) {
        return err;
    }
};

// Commit Activity to CSV
gitUtility.commitActivityToCSV = (commitActivity) => {
    commitActivity = commitActivity.map((item) => {
        const date = new Date(item.week * 1000).toISOString().split("T")[0];
        item.week = date;

        return item;
    });

    const fields = ["total", "week"]
        .concat([
            "days.sunday",
            "days.monday",
            "days.tuesday",
            "days.wednesday",
            "days.thursday",
            "days.friday",
            "days.saturday"
        ]);

    const transforms = (item) => {
        return {
            week: item.week,
            total: item.total,
            "days.sunday": item.days[0],
            "days.monday": item.days[1],
            "days.tuesday": item.days[2],
            "days.wednesday": item.days[3],
            "days.thursday": item.days[4],
            "days.friday": item.days[5],
            "days.saturday": item.days[6]
        };
    };
    const options = { fields, transforms };

    try {
        const parser = new Parser(options);
        const csv = parser.parse(commitActivity);

        return csv;
    } catch (err) {
        return err;
    }
};

// Code Frequency to CSV
gitUtility.codeFrequencyToCSV = (codeFrequency) => {
    codeFrequency = codeFrequency.map((item) => {
        const date = new Date(item[0] * 1000).toISOString().split("T")[0];
        item[0] = date;

        return item;
    });
    const fields = ["week", "addition", "deletion"];

    const transforms = (item) => {
        return { week: item[0], addition: item[1], deletion: item[2] };
    };
    const options = { fields, transforms };

    try {
        const parser = new Parser(options);
        const csv = parser.parse(codeFrequency);

        return csv;
    } catch (err) {
        return err;
    }
};

// Participation to CSV
gitUtility.participationToCSV = (participation) => {
    const fields = ["all", "owner"];

    const array = [];
    participation.all.forEach((element, i) => {
        array.push({
            all: element,
            owner: participation.owner[i]
        });
    });
    const options = { fields };

    try {
        const parser = new Parser(options);
        const csv = parser.parse(array);

        return csv;
    } catch (err) {
        return err;
    }
};

// Punch Card to CSV
gitUtility.punchCardToCSV = (punchCard) => {
    const fields = ["day", "hour", "commits"];

    const transforms = (item) => {
        return { day: item[0], hour: item[1], commits: item[2] };
    };
    const options = { fields, transforms };

    try {
        const parser = new Parser(options);
        const csv = parser.parse(punchCard);

        return csv;
    } catch (err) {
        return err;
    }
};

module.exports = gitUtility;
