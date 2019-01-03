import express from 'express';

import RsvpController from '../controllers/rsvp';

const router = express.Router();

router.post('/meetups/:id/rsvps', RsvpController.create_rsvp_response);

module.exports = router;
