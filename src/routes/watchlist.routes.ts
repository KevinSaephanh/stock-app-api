import { Router } from 'express';
import { WatchlistController } from '../controllers/watchlist.controller';

const watchlistController = new WatchlistController();
const router = Router({ mergeParams: true });

export default router;
