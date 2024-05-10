import { Octokit } from "@octokit/rest";
import { createTokenAuth } from "@octokit/auth-token";
import { VERSION } from "./version.js";

// user defined variables
// FORWARDS
// ORG_SRC='source-org-test' // name of the GitHub Org the repos are being copied FROM
// ORG_DST='dest-org-test' // name of the GitHub Org the repos are being copied TO

// BACKWARDS
// ORG_SRC='dest-org-test'
// ORG_DST='source-org-test'

const ORG_SRC: string = "source-org-test"
const ORG_DST: string = "dest-org-test"

// non user servicable variables


// PoC to validate we can get the Octokit SDK working
const octokit = new Octokit({
    auth: process.env.GH_PAT,
    userAgent: 'github-repo-migrator-' + VERSION,
    log: console,
});

// Compare: https://docs.github.com/en/rest/reference/repos/#list-organization-repositories
octokit.rest.repos
  .listForOrg({
    org: "best-family",
    type: "public",
  })
  .then(({ data }) => {
    // handle data
  });

// display selected details about a GitHub Organization
//export function displayOrganization {}