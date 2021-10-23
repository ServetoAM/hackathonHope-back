const connection = require("../db-config");
const router = require("express").Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM players', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving players from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {
  const playerId = req.params.id;
  connection.query(
    'SELECT * FROM players WHERE id = ?',
    [playerId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving player from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('Player not found');
      }
    }
  );
});

router.post('/', (req, res) => {
  const { player_name, picture_player, firstname, lastname, qualities, palmares, quotes, age, occupation, description_player, other_games, discord, twitter, facebook, instagram, tiktok, twitch, picture_player_reverse } = req.body;
  connection.query(
    'INSERT INTO players (player_name, picture_player, firstname, lastname, qualities, palmares, quotes, age, occupation, description_player, other_games, discord, twitter, facebook, instagram, tiktok, twitch, picture_player_reverse) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [player_name, picture_player, firstname, lastname, qualities, palmares, quotes, age, occupation, description_player, other_games, discord, twitter, facebook, instagram, tiktok, twitch, picture_player_reverse],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the player');
      } else {
        const id = result.insertId;
        const createdPlayer = { player_name, picture_player, firstname, lastname, qualities, palmares, quotes, age, occupation, description_player, other_games, discord, twitter, facebook, instagram, tiktok, twitch, picture_player_reverse };
        res.status(201).json(createdPlayer);
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const playerId = req.params.id;
  const db = connection.promise();
  let existingPlayer = null;
  db.query('SELECT * FROM players WHERE id = ?', [playerId])
    .then(([results]) => {
      existingPlayer = results[0];
      if (!existingPlayer) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE players SET ? WHERE id = ?', [req.body, playerId]);
    })
    .then(() => {
      res.status(200).json({ ...existingPlayer, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`Player with id ${playerId} not found.`);
      else res.status(500).send('Error updating a player');
    });
});

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM players WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an player');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 Player deleted!');
        else res.status(404).send('Player not found.');
      }
    }
  );
});

module.exports = router;