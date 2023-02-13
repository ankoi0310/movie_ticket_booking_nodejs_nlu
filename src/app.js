import express from 'express';
import path from 'path';
import { config } from 'dotenv';

const SERVER_PORT = process.env.SERVER_PORT || 3000;

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(SERVER_PORT, () => {
 console.log(`Server was running on port ${SERVER_PORT}`);
});