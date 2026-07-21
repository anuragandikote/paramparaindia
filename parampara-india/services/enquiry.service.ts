import { enquiryRepository } from "@/repositories/enquiry.repository";
import { EnquiryStatus, EnquiryType } from "@prisma/client";

export const enquiryService = {
  async list(params: {
    page?: number;
    limit?: number;
    search?: string;
    userId?: string;
    status?: EnquiryStatus;
  }) {
    return enquiryRepository.findMany(params);
  },

  async getById(id: string) {
    const enquiry = await enquiryRepository.findById(id);
    if (!enquiry) throw new Error("Enquiry not found");
    return enquiry;
  },

  async create(data: {
    name: string;
    email?: string;
    phone?: string;
    company?: string;
    subject?: string;
    message: string;
    type?: EnquiryType;
    source?: string;
    metadata?: any;
    userId?: string;
    contactId?: string;
  }) {
    return enquiryRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      subject: data.subject,
      message: data.message,
      type: (data.type as any) || "GENERAL",
      source: data.source || "website",
      metadata: data.metadata || undefined,
      ...(data.userId && {
        user: { connect: { id: data.userId } },
      }),
      ...(data.contactId && {
        contact: { connect: { id: data.contactId } },
      }),
    });
  },

  async update(id: string, data: any) {
    await this.getById(id);
    return enquiryRepository.update(id, data);
  },

  async updateStatus(id: string, status: EnquiryStatus) {
    await this.getById(id);
    const updates: any = { status };
    if (status === "RESOLVED" || status === "CLOSED") {
      updates.resolvedAt = new Date();
    }
    return enquiryRepository.update(id, updates);
  },

  async delete(id: string) {
    await this.getById(id);
    return enquiryRepository.delete(id);
  },

  async getStatusCounts() {
    return enquiryRepository.getStatusCounts();
  },

  async submitPublic(data: {
    name: string;
    email?: string;
    phone?: string;
    company?: string;
    subject?: string;
    message: string;
    source?: string;
  }) {
    return this.create({ ...data, source: data.source || "website" });
  },
};
