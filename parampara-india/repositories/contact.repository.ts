import { prisma } from "@/lib/prisma";
import { Prisma, Contact } from "@prisma/client";

export const contactRepository = {
  async findMany(params: {
    page?: number;
    limit?: number;
    search?: string;
    userId?: string;
  }) {
    const { page = 1, limit = 20, search, userId } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.ContactWhereInput = {
      ...(userId && { userId }),
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { company: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { leads: true, enquiries: true } } },
      }),
      prisma.contact.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async findById(id: string) {
    return prisma.contact.findUnique({
      where: { id },
      include: { leads: true, enquiries: true },
    });
  },

  async create(data: Prisma.ContactCreateInput) {
    return prisma.contact.create({ data });
  },

  async update(id: string, data: Prisma.ContactUpdateInput) {
    return prisma.contact.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.contact.delete({ where: { id } });
  },
};
