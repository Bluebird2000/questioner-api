import express from 'express';

import RsvpController from '../controllers/rsvp';

const router = express.Router();

router.post('/meetups/:id/rsvps', RsvpController.rsvpResponse);

export default router;
