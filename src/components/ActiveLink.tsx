import { UrlObject } from 'url';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useMemo } from 'react';

export interface ActiveLinkProps extends PropsWithChildren {
  activeClassName: string;
  className?: string;
  href: string | UrlObject;
}

export const ActiveLink: FC<ActiveLinkProps> = ({ activeClassName, children, className, href }) => {
  const router = useRouter();

  const isActive = useMemo(() => {
    let target = typeof href === 'string' ? href : href.pathname;
    if (!target) target = router.pathname;

    return target === router.pathname;
  }, [href, router.pathname]);

  return (
    <Link href={href}>
      <a className={cx(className, { [activeClassName]: isActive })} href="#.">
        {children}
      </a>
    </Link>
  );
};
