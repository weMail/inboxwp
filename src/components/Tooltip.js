import React, { useState } from '@wordpress/element';

const Tooltip = ({ text, className, children, showAtTop = false }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [top] = useState('inboxwp-tooltip-position-top');
    const [bottom] = useState('inboxwp-bottom-[-7px] inboxwp-left-0');

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div className="inboxwp-relative inboxwp-inline-block">
            <div
                className="inboxwp-cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>
            {showTooltip && (
                <div className={`inboxwp-absolute ${showAtTop ? top : bottom} ${className} inboxwp-z-10 inboxwp-px-2 inboxwp-py-1 inboxwp-mt-2 inboxwp-text-white inboxwp-bg-gray-800 inboxwp-rounded`}>
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
