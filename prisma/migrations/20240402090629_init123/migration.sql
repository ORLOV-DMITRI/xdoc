-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Record" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "subtitle" TEXT,
    "snippet" TEXT,
    "userId" TEXT NOT NULL,
    "sectionsId" TEXT NOT NULL,
    CONSTRAINT "Record_sectionsId_fkey" FOREIGN KEY ("sectionsId") REFERENCES "Sections" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Record" ("id", "sectionsId", "snippet", "subtitle", "title", "userId") SELECT "id", "sectionsId", "snippet", "subtitle", "title", "userId" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
