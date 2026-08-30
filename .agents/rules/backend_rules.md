# Backend Architecture & Database Rules

Follow these rules strictly whenever writing or modifying backend code (Node/Express/Mongoose/Prisma/Sequelize):

1. **No Auto-Seeding on Server Startup**:
   - Never auto-run seed, mock, or test-data functions on server startup.
   - Separate seed scripts into standalone files (e.g., `seed.js` or `prisma/seed.ts`) that only run when explicitly invoked via `npm run seed`.

2. **No Placeholder/Dummy Data in Production Code**:
   - Avoid generic placeholder data ("John Doe", "test@example.com", Lorem ipsum) in production code paths.
   - Any demo data must be explicitly commented as `// TEMP/DEMO` and documented for removal.

3. **Strict Explicit Schema Definitions**:
   - For every database schema field, explicitly define `type`, `required`, and `default` (or nullability).
   - Never leave validation implicit.

4. **Input Validation & Destructuring Safety**:
   - Never save `req.body` directly to the database (no `Model.create(req.body)`).
   - Always destructure only expected fields and validate them using Zod, Joi, or custom validators before DB writes.

5. **Async Safety & Correct Await Ordering**:
   - Ensure every async database operation uses `await` correctly and sequentially.
   - Verify all required fields are assigned before triggering write operations.

6. **Unique Constraints & Error Handling**:
   - Enforce unique indexes/constraints on natural keys (e.g., `email`, `phone`, `aadhaar`).
   - Gracefully catch and return clean API error responses for duplicate key violations (`E11000`, code `P2002`).

7. **Database Write Summary**:
   - Whenever backend code that performs database writes is generated or updated, explicitly summarize what data is written and under what conditions.
