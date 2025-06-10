-- CreateTable
CREATE TABLE "WeatherHistory" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT,
    "searchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" JSONB NOT NULL,

    CONSTRAINT "WeatherHistory_pkey" PRIMARY KEY ("id")
);
