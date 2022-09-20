import { ComponentPropsWithoutRef } from 'react';
import cx from 'classnames';

export function Button(props: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      {...props}
      className={cx(
        'focus:outline-none px-6 py-2 bg-tapBlue active:opacity-75 rounded-full text-white text-sm leading-[22px] font-bold select-none shadow-[inset_0_-3px_0_rgba(0,0,0,0.1)]',
        props.className
      )}
    />
  );
}
