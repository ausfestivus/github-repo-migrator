import { Octokit } from "@octokit/rest";
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


// Initialise Octokit
const octokit = new Octokit({
    auth: process.env.GH_PAT,
    userAgent: 'github-repo-migrator-' + VERSION,
    log: console,
});

// Async function to list repos in an Organization
async function getOrgRepos(org: string) {
  try {
    const orgRepoList = await octokit.repos.listForOrg({
      //per_page: 100,
      org,
    });
    console.log(orgRepoList.data.map(repo => repo.name));
  } catch (error) {
    console.error('Error fetching Organization:', error);
  }
}

// Async function to transfer a repository from one organization to another
async function transferRepository(repo: string, currentOwner: string, newOwner: string) {
  try {
    const response = await octokit.repos.transfer({
      owner: currentOwner,
      repo: repo,
      new_owner: newOwner
    });
    console.log(`Repository transferred. Status: ${response.status}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error transferring repository:', error);
  }
}

// Output the list of repos for the supplied Org
getOrgRepos(ORG_SRC)
