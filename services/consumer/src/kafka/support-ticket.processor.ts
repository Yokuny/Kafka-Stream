import type { Result, SupportTicketCreatedEvent } from '@support-ticket-stream/shared';
import { err, ok, SupportTicketCreatedEventSchema } from '@support-ticket-stream/shared';

export const parseSupportTicketEvent = (raw: string | null | undefined): Result<SupportTicketCreatedEvent> => {
  if (!raw) return err(new Error('Empty message value'));

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return err(new Error('Invalid JSON'));
  }

  const result = SupportTicketCreatedEventSchema.safeParse(parsed);
  if (!result.success) return err(new Error('Invalid event schema'));

  return ok(result.data as SupportTicketCreatedEvent);
};
