import type { MessageType } from '../types/message';
import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';
import audio from './audio/audio-example.mp3';

export const MOCK_MASSAGES: Omit<MessageType, 'id' | 'timestamp'>[] = [
    {
        text: 'Короткое текстовое сообщение 🤗',
        senderId: 'user-1',
        receiverId: '',
        status: 'read',
    },
    {
        text: 'Достаточно длинное текстовое сообщение, чтобы занять больше одной строки и показать как это должно выглядеть 🤣',
        status: 'delivered',
        senderId: 'user-1',
        receiverId: '',
    },
    {
        text: 'Сообщение с картинкой, которое может быть и без текста 🖼',
        status: 'sent',
        senderId: 'user-1',
        receiverId: '',
        attachments: [
            {
                type: 'image',
                url: image1,
                name: 'image1.jpg',
                size: 1024 * 1024, // 1 MB
            },
        ],
    },
    {
        status: 'read',
        senderId: 'user-1',
        receiverId: '',
        attachments: [
            {
                type: 'image',
                url: image1,
                name: 'image1.jpg',
                size: 1024 * 1024, // 1 MB
            },
            {
                type: 'image',
                url: image2,
                name: 'image2.jpg',
                size: 2 * 1024 * 1024, // 2 MB
            },
        ],
    },
    {
        text: 'Не больше трех картинок, остальное уводим в +',
        status: 'read',
        senderId: 'user-1',
        receiverId: '',
        attachments: [
            {
                type: 'image',
                url: image1,
                name: 'image1.jpg',
                size: 1024 * 1024, // 1 MB
            },
            {
                type: 'image',
                url: image2,
                name: 'image2.jpg',
                size: 2 * 1024 * 1024, // 2 MB
            },
            {
                type: 'image',
                url: image3,
                name: 'image3.jpg',
                size: 2 * 1024 * 1024, // 2 MB
            },
        ],
    },
    {
        status: 'read',
        senderId: 'user-1',
        receiverId: '',
        attachments: [
            {
                type: 'file',
                url: 'https://limewire.com/d/JFWad#BgnLvC1D5k',
                name: 'Кассовый чек #8730078768.pdf',
                size: 364000,
            },
        ],
    },
    {
        status: 'read',
        senderId: 'user-1',
        receiverId: '',
        attachments: [
            {
                type: 'audio',
                url: audio,
                size: 364000,
            },
        ],
    },
    {
        text: 'Вот фото, то, что хотела бы попробовать (отправила картинки).\nМне больше нравится вариант, где серый и золотой акценты, но не уверена, получится ли на моей длине.',
        status: 'read',
        senderId: '',
        receiverId: 'user-1',
        attachments: [
            {
                type: 'image',
                url: image1,
                name: 'image1.jpg',
                size: 1024 * 1024, // 1 MB
            },
            {
                type: 'image',
                url: image2,
                name: 'image2.jpg',
                size: 2 * 1024 * 1024, // 2 MB
            },
        ],
    },
    {
        text: 'Давай пятницу в 15:30! Надеюсь, успеем за час-полтора, у меня потом встреча 😅',
        status: 'read',
        senderId: '',
        receiverId: 'user-1',
    },
    {
        text: 'Чек за последнее посещение',
        status: 'read',
        senderId: 'user-1',
        receiverId: '',
        attachments: [
            {
                type: 'file',
                url: 'https://limewire.com/d/JFWad#BgnLvC1D5k',
                name: 'Кассовый чек #8730078768.pdf',
                size: 364000,
            },
        ],
    },
    {
        text: 'Фото супер! Такой дизайн вполне можно сделать, и на твоей длине тоже будет смотреться стильно 🙌\nПятницу в 15:30 записала. Учти, что с дизайном может занять до 1ч 40 мин — но мы постараемся по максимуму уложиться.',
        status: 'read',
        senderId: 'user-1',
        receiverId: '',
    },
];
