import { assert } from 'chai';
import { calculateReleaseToDiffWith } from '../lib/src/_prepareTags.utils';

describe('prepareTags.js', () => {
    describe('major release', () => {
        it('should zerofy patch version', () => {
            const latest = 'v2.0.0';
            const prelatest = 'v1.2.3';
            const expected = 'v1.2.0';
            assert.deepEqual(calculateReleaseToDiffWith(latest, prelatest), expected);
        });
    });

    describe('minor release', () => {
        it('should zerofy patch version', () => {
            const latest = 'v1.3.0';
            const prelatest = 'v1.2.3';
            const expected = 'v1.2.0';
            assert.deepEqual(calculateReleaseToDiffWith(latest, prelatest), expected);
        });
    });

    describe('patch release', () => {
        it('should decrease patch version', () => {
            const latest = 'v1.2.4';
            const prelatest = 'v1.2.3';
            const expected = 'v1.2.3';
            assert.deepEqual(calculateReleaseToDiffWith(latest, prelatest), expected);
        });
    });

    describe('release candidate', () => {
        it('should decrease patch version', () => {
            const latest = 'v1.2.4-rc1';
            const prelatest = 'v1.2.3';
            const expected = 'v1.2.3';
            assert.deepEqual(calculateReleaseToDiffWith(latest, prelatest), expected);
        });
    });

    describe('release candidate after release candidate', () => {
        it('should decrease patch version', () => {
            const latest = 'v1.2.4-rc2';
            const prelatest = 'v1.2.4-rc1';
            const expected = 'v1.2.4-rc1';
            assert.deepEqual(calculateReleaseToDiffWith(latest, prelatest), expected);
        });
    });
});
