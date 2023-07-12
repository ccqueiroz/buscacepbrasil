import { app } from '../functions/src/index';

const _PORT = 8888;

app.listen(_PORT, () => console.log(`server online, porta: ${_PORT}`));
