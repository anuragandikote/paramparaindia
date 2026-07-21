import { prisma } from "@/lib/prisma";
import { Prisma, LeadStatus } from "@prisma/client";

export const leadRepository = {
  async findMany(params: {
    page?: number;
    limit?: number;
    search?: string;
    userId?: string;
    status?: LeadStatus;
  }) {
    const { page = 1, limit = 20, search, userId, status } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.LeadWhereInput = {
      ...(userId && { userId }),
      ...(status && { status }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { contact: { firstName: { contains: search, mode: "insensitive" } } },
          { contact: { email: { contains: search, mode: "insensitive" } } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { contact: true },
      }),
      prisma.lead.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async findById(id: string) {
    return prisma.lead.findUnique({
      where: { id },
      include: { contact: true, enquiry: true },
    });
  },

  async create(data: Prisma.LeadCreateInput) {
    return prisma.lead.create({ data });
  },

  async update(id: string, data: Prisma.LeadUpdateInput) {
    return prisma.lead.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.lead.delete({ where: { id } });
  },

  async getStatusCounts(userId: string) {
    const counts = await prisma.lead.groupBy({
      by: ["status"],
      where: { userId },
      _count: true,
    });
    return counts.reduce(
      (acc, item) => {
        acc[item.status] = item._count;
        return acc;
      },
      {} as Record<LeadStatus, number>
    );
  },
};
