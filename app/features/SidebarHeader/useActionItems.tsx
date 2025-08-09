import { useMemo } from 'react';
import GearIcon from '~/shared/icons/GearIcon';
import SignOutIcon from '~/shared/icons/SignOutIcon';
import type { ActionMenuGroupType } from '~/shared/ui/ActionMenu/types';

export function useActionItems(): ActionMenuGroupType[] {
    function onClick(): void {
        // TODO: add action callback
    }

    return useMemo(
        () => [
            {
                key: 'key',
                items: [
                    {
                        key: 'key1',
                        label: 'Настройки',
                        icon: GearIcon,
                        onClick,
                    },
                ],
            },
            {
                key: 'key2',
                items: [
                    {
                        key: 'key3',
                        label: 'Выйти',
                        icon: SignOutIcon,
                        onClick,
                    },
                ],
            },
        ],
        []
    );
}
