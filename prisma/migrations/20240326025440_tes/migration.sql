/*
  Warnings:

  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Snippet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecordToTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `snippet` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_RecordToTag_B_index";

-- DropIndex
DROP INDEX "_RecordToTag_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Language";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Snippet";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_RecordToTag";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Record" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "subtitle" TEXT,
    "snippet" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sectionsId" TEXT NOT NULL,
    CONSTRAINT "Record_sectionsId_fkey" FOREIGN KEY ("sectionsId") REFERENCES "Sections" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Record" ("id", "sectionsId", "subtitle", "title", "userId") SELECT "id", "sectionsId", "subtitle", "title", "userId" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
