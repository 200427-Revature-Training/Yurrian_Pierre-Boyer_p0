import express from 'express';
import bodyParser from 'body-parser';
require('dotenv').config();
import { db } from './daos/db';
import { usersRouter } from './routers/users-router';
import { foodRouter } from './routers/food-router';
import { ratingsRouter } from './routers/ratings-router';
import { commentsRouter } from './routers/comments-router';

const app = express();

/* 
    Middleware Registration
*/
app.use(bodyParser.json());


/* 
    Router Registration 
*/
app.use('/users', usersRouter);
app.use('/food', foodRouter);
app.use('/ratings', ratingsRouter);
app.use('/comments', commentsRouter);


process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});


const port = process.env.port || 3000;
app.set('port', port);

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port} `);
});