-- CreateTable
CREATE TABLE "collaborators" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collaborators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registers" (
    "id" TEXT NOT NULL,
    "entryHour" TIMESTAMP(3) NOT NULL,
    "exitHour" TIMESTAMP(3) NOT NULL,
    "collaboratorId" TEXT,

    CONSTRAINT "registers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collaborators_code_key" ON "collaborators"("code");

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "collaborators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
