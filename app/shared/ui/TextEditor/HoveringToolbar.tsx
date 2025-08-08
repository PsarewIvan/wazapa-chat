import { memo, type MouseEvent, useCallback, useEffect, useRef } from 'react';
import { Editor, Range } from 'slate';
import { useFocused, useSlate } from 'slate-react';
import TextBold from '~/shared/icons/TextBold';
import TextItalic from '~/shared/icons/TextItalic';
import TextStrikethrough from '~/shared/icons/TextStrikethrough';
import BracketsCurly from '~/shared/icons/BracketsCurly';
import { Portal } from './Portal';
import { Menu } from './Menu';
import FormatButton from './FormatButton';

function HoveringToolbar() {
    const ref = useRef<HTMLDivElement | null>(null);
    const editor = useSlate();
    const inFocus = useFocused();

    useEffect(() => {
        const el = ref.current;
        const { selection } = editor;

        if (!el) {
            return;
        }

        if (
            !selection ||
            !inFocus ||
            Range.isCollapsed(selection) ||
            Editor.string(editor, selection) === ''
        ) {
            el.removeAttribute('style');
            return;
        }

        const domSelection = window.getSelection();
        const domRange = domSelection!.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();
        el.style.opacity = '1';
        el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
        el.style.left = `${
            rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
        }px`;
    });

    const handleMenuMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
    }, []);

    return (
        <Portal>
            <Menu ref={ref} onMouseDown={handleMenuMouseDown}>
                <FormatButton format="bold" icon={<TextBold />} />
                <FormatButton format="italic" icon={<TextItalic />} />
                <FormatButton
                    format="strikethrough"
                    icon={<TextStrikethrough />}
                />
                <FormatButton format="code" icon={<BracketsCurly />} />
            </Menu>
        </Portal>
    );
}

export default memo(HoveringToolbar);
