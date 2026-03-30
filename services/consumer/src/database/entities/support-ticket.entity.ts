import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export interface SupportTicket {
  ticketId: string;
  userId: string;
  currentPage: string;
  previousPage: string;
  message: string;
  currentError: string;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('support_tickets')
export class SupportTicketEntity extends BaseEntity implements SupportTicket {
  @PrimaryColumn({ type: 'varchar', name: 'ticket_id' })
  ticketId!: string;

  @Column({ type: 'varchar', name: 'user_id' })
  userId!: string;

  @Column({ type: 'varchar', name: 'current_page' })
  currentPage!: string;

  @Column({ type: 'varchar', name: 'previous_page' })
  previousPage!: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'text', name: 'current_error' })
  currentError!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;
}
