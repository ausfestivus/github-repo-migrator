import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

// set our variables
// FORWARDS
// ORG_SRC='source-org-test' // name of the GitHub Org the repos are being copied FROM
// ORG_DST='dest-org-test' // name of the GitHub Org the repos are being copied TO

// BACKWARDS
// ORG_SRC='dest-org-test'
// ORG_DST='source-org-test'

const ORG_SRC: string = "source-org-test"
const ORG_DST: string = "dest-org-test"
