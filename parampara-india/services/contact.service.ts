import { contactRepository } from "@/repositories/contact.repository";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const contactService = {
  async list(params: { page?: number; limit?: number; search?: string; userId?: string }) {
    return contactRepository.findMany(params);
  },

  async getById(id: string) {
    const contact = await contactRepository.findById(id);
    if (!contact) throw new Error("Contact not found");
    return contact;
  },

  async create(data: {
    firstName: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    address?: string;
    notes?: string;
    tags?: string[];
    userId: string;
  }) {
    return contactRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      address: data.address,
      notes: data.notes,
      tags: data.tags || [],
      user: { connect: { id: data.userId } },
    });
  },

  async update(
    id: string,
    data: Prisma.ContactUpdateInput
  ) {
    await this.getById(id);
    return contactRepository.update(id, data);
  },

  async delete(id: string) {
    await this.getById(id);
    return contactRepository.delete(id);
  },

  async getByEmail(email: string) {
    return prisma.contact.findFirst({ where: { email } });
  },
};
