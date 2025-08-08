import { memo, type ReactNode } from 'react';
import { useSlate } from 'slate-react';
import Button from '../Button/Button';
import type { CustomTextKey } from './types';
import { isMarkActive, toggleMark } from './helpers';

type Props = {
    format: CustomTextKey;
    icon: ReactNode;
};

function FormatButton({ format, icon }: Props) {
    const editor = useSlate();

    const active = isMarkActive(editor, format);

    return (
        <Button active={active} onClick={() => toggleMark(editor, format)}>
            {icon}
        </Button>
    );
}

export default memo(FormatButton);
