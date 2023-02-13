import express from 'express';
import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/app.routes'));

app.listen(process.env.SERVER_PORT, () => {
 console.log('Server is running on port ' + process.env.SERVER_PORT);
});