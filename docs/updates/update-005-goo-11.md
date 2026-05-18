# GOO-11: PostgreSQL Database Setup

Set up PostgreSQL today and it was... surprisingly straightforward? Installed, created a database, created a user, granted permissions, tested connection from n8n. Done.

The interesting part was understanding the hierarchy. There's the PostgreSQL _server_ (the thing running on port 5432), then _databases_ within that server (I created `oolong_prod`), then _users_ who can access those databases (created `oolong_user`). And then within a database there's _schemas_ which is like another layer of organization. It's nested all the way down.

Learned why you don't just use the superuser (`postgres`) for everything: principle of least privilege. If n8n gets compromised, the attacker only has access to `oolong_prod`, not every database on the server. Makes sense.

Hit a moment of confusion when `systemctl status` showed PostgreSQL as "inactive" but it was actually running fine. Used `lsof -i :5432` to check if anything was listening on the PostgreSQL port, and yep - there it was. Services can be running even when systemd says they're not. Good to know.

Also documented a basic backup strategy. Currently it's "run `pg_dump` manually" which is... not great. But it's documented, and the plan is to automate it with cron jobs later. Backups are stored on the same VPS which also isn't ideal (if the whole server dies, backups die too), but that's a future problem.

Next: actually designing the database schema. Tables for stories, moderation status, learning journal. This is where it gets real.

—

**One learning:** PostgreSQL permissions work in layers. You need to grant access to the _database_ (`GRANT ALL PRIVILEGES ON DATABASE`) AND to the _schema_ within that database (`GRANT ALL ON SCHEMA public`). Missing either one = n8n can't create tables.

**One struggle:** The `\c` command in psql is a meta-command (not SQL), so you can't run it on the same line as a SQL statement. Tried to do `\c database; GRANT ALL...` and got a cryptic "invalid integer value" error. Meta-commands need their own line. psql quirks.
