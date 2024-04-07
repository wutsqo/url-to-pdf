/*
  Warnings:

  - You are about to drop the column `file_name` on the `Pdf` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pdf" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);
INSERT INTO "new_Pdf" ("created_at", "id", "status", "updated_at", "url") SELECT "created_at", "id", "status", "updated_at", "url" FROM "Pdf";
DROP TABLE "Pdf";
ALTER TABLE "new_Pdf" RENAME TO "Pdf";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
