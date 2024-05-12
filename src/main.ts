import { Octokit } from "@octokit/rest";
import { VERSION } from "./version.js";

// user defined variables
const ORG_SRC: string = "source-org-test" // name of the GitHub Org the repos are being copied FROM
const ORG_DST: string = "dest-org-test" // name of the GitHub Org the repos are being copied TO
const PREFIX_DST: string = "nerk" // prefix to place on the repo name in the destination Organization

// Initialise Octokit
const octokit = new Octokit({
    auth: process.env.GH_PAT,
    userAgent: 'github-repo-migrator-' + VERSION,
    log: console,
});

// Async function to get repository names from an organization
async function getOrgRepos(org: string): Promise<string[]> {
  try {
    const response = await octokit.repos.listForOrg({
      org,
    });
    return response.data.map(repo => repo.name);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

// Async function to transfer a repository from one organization to another with a new name
async function transferRepository(repo: string, currentOwner: string, newOwner: string, newName: string) {
  try {
    const response = await octokit.repos.transfer({
      owner: currentOwner,
      repo: repo,
      new_owner: newOwner,
      new_name: newName  // Specify the new name for the repository
    });
    console.log(`Repository ${repo} transferred to ${newOwner} with new name ${newName}. Status: ${response.status}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error transferring repository:', error);
  }
}

// Main function to transfer repositories from one organization to another with renaming
async function transferReposFromOrgToOrg(currentOrg: string, newOrg: string) {
  try {
    // Get the list of repositories from the current organization
    const repoNames = await getOrgRepos(currentOrg);

    // Transfer each repository to the new organization with renaming
    for (const repoName of repoNames) {
      const newName = `${PREFIX_DST}-${repoName}`;
      await transferRepository(repoName, currentOrg, newOrg, newName);
    }

    console.log(`All repositories transferred from ${currentOrg} to ${newOrg} with renaming.`);
  } catch (error) {
    console.error('Error transferring repositories:', error);
  }
}

// Example usage: Transfer repositories from ORG_SRC to ORG_DST
transferReposFromOrgToOrg(ORG_SRC, ORG_DST);