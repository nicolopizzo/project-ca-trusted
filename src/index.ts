import express, { json } from 'express';
import cors from 'cors';
import { PrivacyRouter } from './controller/poi.controller';

const app = express();
const PORT = 3002;

app.use(json());
app.use(cors());

app.use('/privacy', PrivacyRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
