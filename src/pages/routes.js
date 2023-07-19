import {createRouter} from 'vue-router'

import defaultRoute from './routes/default';
import sessionRoutes from './routes/session';
import itemRoutes from './routes/items';
import clientRoutes from './routes/clients';
import corporationRoutes from './routes/corporations';

const routes = [
  defaultRoute,
  ...sessionRoutes,
  ...itemRoutes,
  ...clientRoutes,
  ...corporationRoutes,
]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}