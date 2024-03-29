'use client';
import * as React from 'react';

/**
 * @ignore - internal component.
 * @type {React.Context<{} | {expanded: boolean, disabled: boolean, toggle: () => void}>}
 */
const AccordionContext = React.createContext({});

if (import.meta.env.NODE_ENV !== 'production') {
  AccordionContext.displayName = 'AccordionContext';
}

export default AccordionContext;
