export type MessageStatusType = 'sent' | 'delivered' | 'read' | 'failed';
export type AttachmentType = 'image' | 'video' | 'audio' | 'file';

export type MessageType = {
    id: string;
    text?: string;
    senderId: string;
    receiverId: string;
    timestamp: Date;
    status: MessageStatusType;
    attachments?: Array<{
        type: AttachmentType;
        url: string;
        name?: string;
        size?: number;
    }>;
};
