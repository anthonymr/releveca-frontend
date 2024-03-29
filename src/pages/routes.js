import {createRouter} from 'vue-router'

import defaultRoute from './routes/default';
import sessionRoutes from './routes/session';
import itemRoutes from './routes/items';
import clientRoutes from './routes/clients';
import orderRoutes from './routes/orders';
import paymentRoutes from './routes/payments';
import corporationRoutes from './routes/corporations';
import settingRoutes from './routes/settings';
import warranty from './routes/warranty';

const routes = [
  ...sessionRoutes,
  defaultRoute,
  itemRoutes,
  clientRoutes,
  orderRoutes,
  paymentRoutes,
  corporationRoutes,
  settingRoutes,
  warranty,
]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}