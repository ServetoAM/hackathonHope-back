const connection = require("../db-config");
const router = require("express").Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM staff', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving staff from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {
  const staffId = req.params.id;
  connection.query(
    'SELECT * FROM staff WHERE id = ?',
    [staffId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving staff from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('Staff not found');
      }
    }
  );
});

router.post('/', (req, res) => {
  const { staff_name, firstname, age, position, discord, twitter, facebook, instagram, tiktok, twitch } = req.body;
  connection.query(
    'INSERT INTO staff (staff_name, firstname, age, position, discord, twitter, facebook, instagram, tiktok, twitch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [staff_name, firstname, age, position, discord, twitter, facebook, instagram, tiktok, twitch],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the staff');
      } else {
        const id = result.insertId;
        const createdStaff = { staff_name, firstname, age, position, discord, twitter, facebook, instagram, tiktok, twitch };
        res.status(201).json(createdStaff);
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const staffId = req.params.id;
  const db = connection.promise();
  let existingStaff = null;
  db.query('SELECT * FROM staff WHERE id = ?', [staffId])
    .then(([results]) => {
      existingStaff = results[0];
      if (!existingStaff) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE staff SET ? WHERE id = ?', [req.body, staffId]);
    })
    .then(() => {
      res.status(200).json({ ...existingStaff, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`Staff with id ${staffId} not found.`);
      else res.status(500).send('Error updating a staff');
    });
});

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM staff WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting a staff');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 Staff deleted!');
        else res.status(404).send('Staff not found.');
      }
    }
  );
});

module.exports = router;