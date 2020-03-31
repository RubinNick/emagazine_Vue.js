import axios from 'axios';

import { requestInterceptor } from './interceptors/requestInterceptor';
import { responseInterceptor } from './interceptors/responseIntercetors';

export const api = axios.create({
  baseURL: `http://localhost:60183/api/`
});

requestInterceptor(api);

responseInterceptor(api);