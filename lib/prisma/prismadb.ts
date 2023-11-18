import { PrismaClient } from ".prisma/client";

const prismaClientSingleton = () => {
	return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

// 本番環境以外では、ホットリロード時の余分なDBコネクションの生成を防ぐために、シングルトンを利用する
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
