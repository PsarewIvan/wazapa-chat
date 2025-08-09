import {
    type ForwardRefExoticComponent,
    type ReactNode,
    type RefAttributes,
    type SVGProps,
} from 'react';

export type ActionMenuItemType = {
    key: string;
    className?: string;
    classNameIcon?: string;
    disabled?: boolean;
    hidden?: boolean;
    hasCloseOnClick?: boolean;
    icon?: ForwardRefExoticComponent<
        Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
    >;
    label: ReactNode;
    onClick: (key: string, value?: string) => void;
    value?: string;
};

export type ActionSubMenuItemType = ActionMenuItemType;

export type ActionMenuSubMenuType = Omit<
    ActionMenuItemType,
    'hasCloseOnClick' | 'onClick'
> & {
    subItems: ActionSubMenuItemType[];
};

export type ActionMenuItemsType = ActionMenuItemType | ActionMenuSubMenuType;

export type ActionMenuGroupType = {
    key: string;
    title?: string;
    items: ActionMenuItemsType[];
    hidden?: boolean;
};
