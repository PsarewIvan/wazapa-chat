import { memo } from 'react';

type Props = {
    className?: string;
};

function LogoIcon({ className }: Props) {
    return (
        <svg
            className={className}
            fill="none"
            height="32"
            viewBox="0 0 32 32"
            width="32"
        >
            <path
                d="m0 16c0-13.176 2.824-16 16-16s16 2.824 16 16-2.824 16-16 16-16-2.824-16-16z"
                fill="#f56200"
            />
            <g fill="#fff">
                <path d="m10.624 16.708 6.508-6.508 2.264 2.264-9.052 9.052-4.244-4.244 2.548-2.544z" />
                <path d="m14.5855 19.5336 9.0509-9.0509 2.2627 2.2628-9.0508 9.0508z" />
            </g>
        </svg>
    );
}

export default memo(LogoIcon);
