const semver = require('semver');

export function calculateReleaseToDiffWith(latest, prelatest) {
    const latestVer = semver.coerce(latest);
    if (!latestVer) {
        throw new Error('semver failed to parse the latest release tag, exiting.');
    }
    const prelatestVer = semver.coerce(prelatest);
    if (!prelatestVer) {
        throw new Error('semver failed to parse the latest but one release tag, exiting.');
    }

    let res;
    if (latestVer.major !== prelatestVer.major) {
        // major release
        res = `v${prelatestVer.major}.${prelatestVer.minor}.0`;
    } else if (latestVer.minor !== prelatestVer.minor) {
        // minor release
        res = `v${prelatestVer.major}.${prelatestVer.minor}.0`;
    } else if (latestVer.patch !== prelatestVer.patch) {
        // patch release
        res = `v${prelatestVer.major}.${prelatestVer.minor}.${prelatestVer.patch}`;
    } else {
        // prerelease
        // TODO change logic to return previous stable release
        res = prelatest;
    }
    return res;
}
