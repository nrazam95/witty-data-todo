CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "name" varchar NOT NULL,
  "username" varchar,
  "encryptedPassword" varchar NOT NULL,
  "imageId" varchar,
  "createdAt" timestamp DEFAULT current_timestamp NOT NULL
);

CREATE TABLE "todos" (
  "id" serial PRIMARY KEY,
  "todo" varchar NOT NULL,
  "dueAt" timestamp,
  "userId" integer NOT NULL REFERENCES "users" ON DELETE cascade,
  "isPublic" boolean DEFAULT false,
  "sharingId" uuid DEFAULT uuid_generate_v4(),
  "createdAt" timestamp DEFAULT current_timestamp NOT NULL
);
CREATE INDEX "todos_userId_index" ON "todos" ("userId");