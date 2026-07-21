import { leadRepository } from "@/repositories/lead.repository";
import { Prisma, LeadStatus } from "@prisma/client";

export const leadService = {
  async list(params: {
    page?: number;
    limit?: number;
    search?: string;
    userId?: string;
    status?: LeadStatus;
  }) {
    return leadRepository.findMany(params);
  },

  async getById(id: string) {
    const lead = await leadRepository.findById(id);
    if (!lead) throw new Error("Lead not found");
    return lead;
  },

  async create(data: {
    title: string;
    description?: string;
    value?: number;
    status?: LeadStatus;
    source?: string;
    assignedTo?: string;
    contactId?: string;
    userId: string;
  }) {
    return leadRepository.create({
      title: data.title,
      description: data.description,
      value: data.value,
      status: (data.status as any) || "NEW",
      source: (data.source as any) || "WEBSITE",
      assignedTo: data.assignedTo,
      user: { connect: { id: data.userId } },
      ...(data.contactId && {
        contact: { connect: { id: data.contactId } },
      }),
    });
  },

  async update(id: string, data: Prisma.LeadUpdateInput) {
    await this.getById(id);
    return leadRepository.update(id, data);
  },

  async updateStatus(id: string, status: LeadStatus) {
    await this.getById(id);
    const updates: Prisma.LeadUpdateInput = { status };
    if (status === "WON" || status === "LOST") {
      updates.closedAt = new Date();
    }
    return leadRepository.update(id, updates);
  },

  async delete(id: string) {
    await this.getById(id);
    return leadRepository.delete(id);
  },

  async getStatusCounts(userId: string) {
    return leadRepository.getStatusCounts(userId);
  },
};
