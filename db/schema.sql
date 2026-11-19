CREATE TABLE IF NOT EXISTS offers (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text, title text NOT NULL, service text NOT NULL, price text NOT NULL,
  summary text NOT NULL DEFAULT '', includes text[] NOT NULL DEFAULT '{}', terms text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT true, active boolean NOT NULL DEFAULT true, sort int NOT NULL DEFAULT 0, "createdAt" timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS orders (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text, number serial UNIQUE, "offerId" text REFERENCES offers(id) ON DELETE SET NULL,
  "offerName" text NOT NULL DEFAULT '', name text NOT NULL, email text NOT NULL, phone text NOT NULL, street text NOT NULL, city text NOT NULL,
  state text NOT NULL, zip text NOT NULL, date text NOT NULL DEFAULT '', notes text NOT NULL DEFAULT '', status text NOT NULL DEFAULT 'new',
  "adminNote" text NOT NULL DEFAULT '', "createdAt" timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS reviews (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text, name text NOT NULL, city text NOT NULL DEFAULT '', rating int NOT NULL, text text NOT NULL,
  "orderNum" int UNIQUE, approved boolean NOT NULL DEFAULT false, "createdAt" timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS review_images (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text, "reviewId" text NOT NULL REFERENCES reviews(id) ON DELETE CASCADE, mime text NOT NULL, data bytea NOT NULL);
CREATE TABLE IF NOT EXISTS posts (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text, slug text UNIQUE NOT NULL, title text NOT NULL, "metaTitle" text NOT NULL DEFAULT '',
  "metaDesc" text NOT NULL DEFAULT '', excerpt text NOT NULL DEFAULT '', content text NOT NULL, tags text[] NOT NULL DEFAULT '{}',
  cover text NOT NULL DEFAULT '', published boolean NOT NULL DEFAULT true, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS conversations (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text, token text UNIQUE NOT NULL, name text NOT NULL, contact text NOT NULL,
  unread boolean NOT NULL DEFAULT true, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS messages (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text, "convId" text NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  "from" text NOT NULL, body text NOT NULL, at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS messages_conv ON messages("convId", at);
CREATE INDEX IF NOT EXISTS review_images_rev ON review_images("reviewId");
