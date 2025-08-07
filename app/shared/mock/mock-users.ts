import type { UserType } from '../types/user';
import avatar1 from './avatar/avatar1.jpg';
import avatar2 from './avatar/avatar2.jpg';
import avatar3 from './avatar/avatar3.jpg';
import avatar4 from './avatar/avatar4.jpg';
import avatar5 from './avatar/avatar5.jpg';
import avatar6 from './avatar/avatar6.jpg';
import avatar7 from './avatar/avatar7.jpg';
import avatar8 from './avatar/avatar8.jpg';
import avatar9 from './avatar/avatar9.jpg';

export const MOCK_USERS: UserType[] = [
    {
        id: '1',
        name: 'Анастасия Миронова',
        messenger: 'max',
        phone: '+7 (555) 902-24-42',
        avatarSrc: avatar1,
        unreadCount: 1,
    },
    {
        id: '2',
        name: 'Мария 💅',
        messenger: 'whatsapp',
        phone: '+7 (555) 902-24-41',
        avatarSrc: avatar2,
        unreadCount: 8888,
    },
    {
        id: '3',
        name: 'Олеся',
        messenger: 'whatsapp',
        phone: '+7 (555) 902-24-40',
        avatarSrc: avatar3,
    },
    {
        id: '4',
        name: 'Dasha',
        messenger: 'telegram',
        phone: '+7 (555) 902-24-39',
        avatarSrc: avatar4,
    },
    {
        id: '5',
        name: 'Катя Л.',
        messenger: 'other',
        phone: '+7 (555) 902-24-38',
    },
    {
        id: '6',
        name: 'Иван Петров',
        messenger: 'whatsapp',
        phone: '+7 (555) 902-24-37',
        avatarSrc: avatar5,
    },
    {
        id: '7',
        name: 'Анна Кравцова',
        messenger: 'telegram',
        phone: '+7 (555) 902-24-36',
        avatarSrc: avatar6,
    },
    {
        id: '8',
        name: 'Kristina Kristina Kristina Kristina Kristina Kristina Kristina Kristina Kristina Kristina',
        messenger: 'whatsapp',
        phone: '+7 (555) 902-24-35',
        avatarSrc: avatar7,
    },
    {
        id: '9',
        name: 'Лена✨',
        messenger: 'vk',
        phone: '+7 (555) 902-24-34',
        avatarSrc: avatar8,
    },
    {
        id: '10',
        name: 'Вика Б.',
        messenger: 'viber',
        phone: '+7 (555) 902-24-33',
        avatarSrc: avatar9,
    },
];
