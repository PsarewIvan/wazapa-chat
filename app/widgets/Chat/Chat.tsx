import { memo } from 'react';

type Props = {
    className?: string;
};

function Chat({ className }: Props) {
    return <div className={className}>Chat</div>;
}

export default memo(Chat);
