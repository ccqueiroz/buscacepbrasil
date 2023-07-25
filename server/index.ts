import { app } from '../api/index';

const _PORT = 8888;

app.listen(_PORT, () => console.log(`server online, porta: ${_PORT}`));
