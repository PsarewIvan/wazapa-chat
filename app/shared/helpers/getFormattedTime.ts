const SHORT_MONTHS = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
];

export function getFormattedTime(date: Date): string {
    const now = new Date();
    const input = new Date(date);

    const isToday =
        now.getFullYear() === input.getFullYear() &&
        now.getMonth() === input.getMonth() &&
        now.getDate() === input.getDate();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
        yesterday.getFullYear() === input.getFullYear() &&
        yesterday.getMonth() === input.getMonth() &&
        yesterday.getDate() === input.getDate();

    const time = input.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    });

    if (isToday) {
        return time;
    } else if (isYesterday) {
        return `Вчера ${time}`;
    } else {
        const day = input.getDate();
        const monthShort = SHORT_MONTHS[input.getMonth()];
        return `${day} ${monthShort} ${time}`;
    }
}
