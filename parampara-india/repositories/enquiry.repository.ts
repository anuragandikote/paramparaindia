import { prisma } from "@/lib/prisma";
import { Prisma, EnquiryStatus } from "@prisma/client";

export const enquiryRepository = {
  async findMany(params: {
    page?: number;
    limit?: number;
    search?: string;
    userId?: string;
    status?: EnquiryStatus;
  }) {
    const { page = 1, limit = 20, search, userId, status } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.EnquiryWhereInput = {
      ...(userId && { userId }),
      ...(status && { status }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { subject: { contains: search, mode: "insensitive" } },
          { message: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      prisma.enquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { contact: true },
      }),
      prisma.enquiry.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async findById(id: string) {
    return prisma.enquiry.findUnique({
      where: { id },
      include: { contact: true, lead: true },
    });
  },

  async create(data: Prisma.EnquiryCreateInput) {
    return prisma.enquiry.create({ data });
  },

  async update(id: string, data: Prisma.EnquiryUpdateInput) {
    return prisma.enquiry.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.enquiry.delete({ where: { id } });
  },

  async getStatusCounts() {
    const counts = await prisma.enquiry.groupBy({
      by: ["status"],
      _count: true,
    });
    return counts.reduce(
      (acc, item) => {
        acc[item.status] = item._count;
        return acc;
      },
      {} as Record<EnquiryStatus, number>
    );
  },
};
