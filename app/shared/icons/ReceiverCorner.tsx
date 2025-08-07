import { memo } from 'react';

type Props = {
    className?: string;
};

function ReceiverCorner({ className }: Props) {
    return (
        <svg
            className={className}
            fill="none"
            height="16"
            viewBox="0 0 12 16"
            width="12"
        >
            <path
                d="m12 16h-9.03733c-2.634176 0-3.953375-3.1503-2.090734-4.9927l11.128064-11.00729905z"
                fill="currentColor"
            />
        </svg>
    );
}

export default memo(ReceiverCorner);
