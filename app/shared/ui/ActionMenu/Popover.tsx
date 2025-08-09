import {
    type ReactNode,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { usePopper } from 'react-popper';
import { Portal } from '../Portal/Portal';

export type TypePopoverPosition =
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';

function usePosition(
    placement: TypePopoverPosition,
    defaultPosition: TypePopoverPosition,
    onChange: (curPosition: TypePopoverPosition) => void
): void {
    const [position, setPosition] =
        useState<TypePopoverPosition>(defaultPosition);

    useEffect(() => {
        if (placement && placement !== position) {
            setPosition(placement);
        }
    }, [placement, position]);

    useEffect(() => {
        onChange(position);
    }, [position, onChange]);
}

type TypeOffsetModifier = {
    name: 'offset';
    options: {
        offset?: [number, number];
    };
};

type TypeFlipModifier = {
    name: 'flip';
    options: {
        flipVariations: boolean;
        fallbackPlacements?: [TypePopoverPosition];
    };
};

type RefElement = HTMLElement | null;

type Props = {
    children: ReactNode;
    className?: string;
    dataTestId?: string;
    offset?: [number, number];
    position: TypePopoverPosition;
    strategy?: 'absolute' | 'fixed';
    target: HTMLElement;
    portalContainer?: HTMLElement;
    hasFlip?: boolean;
    hasFlipVariations?: boolean;
    height?: number;
    width?: number;
    onHidden?: () => void;
    onShown?: () => void;
    onChangePosition?: (position: TypePopoverPosition) => void;
};

function Popover({
    hasFlip = true,
    hasFlipVariations = true,
    strategy = 'absolute',
    ...props
}: Props) {
    const [target, setTarget] = useState<RefElement>(props.target);
    const [popover, setPopover] = useState<RefElement>(null);

    useEffect(() => {
        setTarget(props.target);
    }, [props.target]);

    useEffect(() => {
        if (props.onShown) {
            props.onShown();
        }

        return (): void => {
            if (props.onHidden) {
                props.onHidden();
            }
        };
        // eslint-disable-next-line
    }, []);

    function handleChangePosition(position: TypePopoverPosition): void {
        if (props.onChangePosition) {
            props.onChangePosition(position);
        }
    }

    const offset: [number, number] | undefined = useMemo(() => {
        const hasRightPosition = props.position.includes('right');
        const hasLeftPosition = props.position.includes('left');

        if (props.offset && (hasRightPosition || hasLeftPosition)) {
            const [x, y] = props.offset;

            return [y, x];
        }

        return props.offset;
    }, [props.offset, props.position]);

    const getModifiers = useCallback(() => {
        const offsetModifier: TypeOffsetModifier = {
            name: 'offset',
            options: { offset },
        };
        const flipModifier: TypeFlipModifier = {
            name: 'flip',
            options: { flipVariations: hasFlipVariations },
        };

        if (!hasFlip) {
            flipModifier.options.fallbackPlacements = [props.position];
        }

        return [offsetModifier, flipModifier];
    }, [hasFlipVariations, hasFlip, props.position, offset]);

    const { state, styles, attributes } = usePopper(target, popover, {
        placement: props.position,
        strategy,
        modifiers: getModifiers(),
    });

    usePosition(
        state?.placement as TypePopoverPosition,
        props.position,
        handleChangePosition
    );

    const mountNode = props.portalContainer ? props.portalContainer : undefined;

    return (
        <Portal container={mountNode}>
            <div
                ref={setPopover}
                className={props.className}
                data-test-id={props.dataTestId}
                style={{
                    ...styles.popper,
                    width: props.width,
                    height: props.height,
                }}
                {...attributes.popper}
            >
                {props.children}
            </div>
        </Portal>
    );
}

export default memo(Popover);
