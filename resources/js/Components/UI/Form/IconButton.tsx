import { Button } from '@/Components/UI/Form/index';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonHTMLAttributes } from 'react';

export default function IconButton({
    iconSize = 'xs',
    iconName,
    children,
    className = '',
    theme = 'primary',
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    iconSize?: SizeProp;
    iconName: IconProp;
}) {
    return (
        <Button className={className} {...props} theme={theme}>
            <FontAwesomeIcon icon={iconName} size={iconSize} className="mr-2" />
            {children}
        </Button>
    );
}
