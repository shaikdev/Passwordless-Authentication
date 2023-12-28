import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const TokenService = {
  createToken: async (body: any) => {
    const token = await prisma.token.create({ data: body,include:{user:true} });
    return token;
  },
  getToken: async (emailToken: number | string) => {
    // @ts-ignore
    const token = await prisma.token.findUnique({where: { email_token: emailToken }, include: { user: true },});
    return token;
  },
  updateToken: async (id: number, body: any) => {
    const token = await prisma.token.update({ where: { id }, data: body });
    return token;
  },
};

export default TokenService;
