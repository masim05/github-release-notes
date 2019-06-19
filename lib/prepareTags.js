#!/usr/bin/env node

const Octokit = require('@octokit/rest');
const semver = require('semver');
const { calculateReleaseToDiffWith } = require('../dist/_prepareTags.utils');

const { OCTOKIT_GITHUB_TOKEN } = process.env;
if (!OCTOKIT_GITHUB_TOKEN) {
    exitWithMessage('No OCTOKIT_GITHUB_TOKEN env variable set, exiting.');
}

const argv = require('minimist')(process.argv.slice(2));
let { owner } = argv;
const { repo } = argv;

if (!owner) {
    owner = 'plyo';
}
if (!repo) {
    exitWithMessage('No --repo option given, exiting.');
}

const octokit = new Octokit({
    auth: process.env.OCTOKIT_GITHUB_TOKEN
});

getReleasesToDiff(octokit, owner, repo).then(({ from, to }) => {
    console.log(`${from}..${to}`);
});

async function getReleasesToDiff(octokit, owner, repo) {
    try {
        const { latest, prelatest } = await getTwoLatestReleases(octokit, owner, repo);
        const from = calculateReleaseToDiffWith(latest, prelatest);
        const to = latest;
        return { from, to };
    } catch (e) {
        return exitWithMessage(e);
    }
}

async function getTwoLatestReleases(octokit, owner, repo) {
    const res = await octokit.repos.listReleases({
        owner,
        repo
    });
    const rs = res.data.map((r) => r.name || r.tag_name);
    if (rs.length < 2) {
        exitWithMessage('Found less than 2 releases.');
    }
    semver.rsort(rs);
    const latest = rs[0];
    const prelatest = rs[1];
    return { latest, prelatest };
}

function exitWithMessage(msg, code) {
    console.error(msg);
    process.exit(code || 1);
}
