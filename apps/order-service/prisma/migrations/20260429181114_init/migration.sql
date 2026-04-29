-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "total_items" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
