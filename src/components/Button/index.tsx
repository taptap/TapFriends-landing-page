import { ComponentPropsWithoutRef } from 'react';
import cx from 'classnames';

import styles from './index.module.css';

export function Button(props: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      {...props}
      className={cx(
        styles.button,
        'focus:outline-none px-6 py-2 bg-tapBlue active:opacity-75 rounded-full text-white text-sm leading-[22px] font-bold select-none',
        props.className
      )}
    />
  );
}
