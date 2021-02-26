const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken')

router.get('/', verifyToken, (req, res) => {
  res.json({
    posts: {
      title: 'My First Post',
      description: 'Just some random data'
    }
  })
});

module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMmVhMDhjZjg0MDk5MTAyMTBjOTgxYSIsImlhdCI6MTYxNDM2MDgxM30.2do3m-ruHJTQdVEACOP0snoqyd_t1ddWlg_f61cTTxc