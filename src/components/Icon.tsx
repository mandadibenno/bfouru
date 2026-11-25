import type { ReactNode, SVGProps } from 'react';

type IconName =
  | 'arrow'
  | 'arrow-up-right'
  | 'whatsapp'
  | 'phone'
  | 'mail'
  | 'plus'
  | 'check'
  | 'close'
  | 'menu'
  | 'chevron'
  | 'minus'
  | 'copy'
  | 'pause'
  | 'play';

const paths: Record<IconName, ReactNode> = {
  arrow: <path d="M4 12h15m0 0-6-6m6 6-6 6" />,
  'arrow-up-right': <path d="M7 17 17 7m0 0H8m9 0v9" />,
  whatsapp: (
    <>
      <path d="M4.5 19.5 5.6 15.7A8 8 0 1 1 8.4 18.4z" />
      <path d="M9.2 8.6c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.6l-.5.6c-.1.2-.1.4 0 .5.6 1 1.4 1.8 2.4 2.4.2.1.4.1.5 0l.6-.5c.2-.1.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3 0 .6-.4.8-.6.4-1.5.6-2.3.4-2.4-.6-4.4-2.6-5-5-.2-.8 0-1.7.4-2.3z" fill="currentColor" stroke="none" />
    </>
  ),
  phone: <path d="M5 4h3.2l1.6 4-2 1.3a10 10 0 0 0 4.9 4.9l1.3-2 4 1.6V17a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2.5" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </>
  ),
  pause: <path d="M9 6v12M15 6v12" />,
  play: <path d="M8 5.5v13l10-6.5z" />,
};

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

/** Button arrow pair — the second arrow slides in on hover (see .btn__icon in global.css). */
export function BtnArrow({ name = 'arrow' }: { name?: IconName }) {
  return (
    <span className="btn__icon" aria-hidden="true">
      <Icon name={name} />
      <Icon name={name} />
    </span>
  );
}
