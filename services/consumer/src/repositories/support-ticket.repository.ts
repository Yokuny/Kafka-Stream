import type { SupportTicket } from '../database/entities/index.js';
import { SupportTicketEntity } from '../database/entities/index.js';

export const saveSupportTicket = async (ticket: SupportTicket): Promise<SupportTicketEntity> => {
  const newTicket = SupportTicketEntity.create({ ...ticket } as any);
  return await newTicket.save();
};
