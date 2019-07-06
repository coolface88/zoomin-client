import boolean from 'boolean';
import express from 'express';
import {
  omit,
  findIndex,
  get,
  pick
} from 'lodash';
import path from 'path';
import PageController from 'controllers/PageController';
import HookController from 'controllers/HookController';

const router = new express.Router();

router.get('/', PageController.index);

router.post('/hook', HookController.dispatchWebhookEvents);


export default router;
