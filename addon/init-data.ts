import mongoose from 'mongoose';


const uri = `mongodb+srv://root:root@movie-ticket-booking.fqvikja.mongodb.net/movie_ticket_booking?retryWrites=true&w=majority`;

mongoose.set('strictQuery', true);

mongoose.connect(uri).then(async () => {
  console.log("Connected to MongoDB");

  // check if the database is already initialized
  // mongoose.connection.db.databaseName;

  const db = mongoose.connection.db;

  await db.dropCollection('app_user');
  await db.dropCollection('api_key');

  if (!(await db.listCollections({ name: 'role' }).hasNext())) {
    await db.createCollection('role');

    await db.collection('role').insertMany([
      {
        type: 'USER',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'ADMIN',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }

  if (!(await db.listCollections({ name: 'genre' }).hasNext())) {
    await db.createCollection('genre');

    await db.collection('genre').insertMany([
      { name: 'Action' },
      { name: 'Adventure' },
      { name: 'Animation' },
      { name: 'Comedy' },
      { name: 'Crime' },
      { name: 'Documentary' },
      { name: 'Drama' },
      { name: 'Family' },
      { name: 'Fantasy' },
      { name: 'History' },
      { name: 'Horror' },
      { name: 'Music' },
      { name: 'Mystery' },
      { name: 'Romance' },
      { name: 'Science Fiction' },
      { name: 'TV Movie' },
      { name: 'Thriller' },
      { name: 'War' },
      { name: 'Western' },
    ]);
  }

  await db.createCollection('app_user');
  await db.createCollection('api_key');

  await db.collection('api_key').deleteMany({});
  await db.collection('api_key').insertOne({
    key: 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
    permissions: ['GENERAL'],
    comments: ['To be used by the xyz vendor'],
    version: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // clear data from the collection
  await db.collection('app_user').deleteMany({});
  await db.collection('app_user').insertOne({
    email: 'admin@xyz.com',
    phone: '1234567890',
    password: '$2a$10$psWmSrmtyZYvtIt/FuJL1OLqsK3iR1fZz5.wUYFuSNkkt.EOX9mLa', // hash of password: changeit
    roles: db.collection('role').find({ code: 'ADMIN' }).toArray(),
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log('Database initialized successfully');

  process.exit(0);
});