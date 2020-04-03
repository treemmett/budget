import React, { FC, useEffect, useRef, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import More from '../../assets/icons/moreVertical.svg';
import cx from 'classnames';
import onEnter from '../../utils/onEnter';
import styles from './Menu.scss';

interface MenuItem {
  action: () => void;
  icon?: React.FC<React.SVGAttributes<SVGElement>>;
  text: string;
}

interface MenuProps {
  className?: string;
  items: MenuItem[];
}

const Menu: FC<MenuProps> = ({ className, items }) => {
  const menuRef = useRef<HTMLDivElement>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [rightAligned, setRightAligned] = useState(false);
  const transitions = useTransition(menuOpen, null, {
    config: {
      duration: 125,
    },
    enter: { height: `${items.length * 2.5}rem`, opacity: 1 },
    from: { height: '2.5rem', opacity: 0 },
    leave: { height: '2.5rem', opacity: 0 },
    onDestroyed: () => {
      if (!menuOpen) {
        setRightAligned(false);
      }
    },
  });

  function handleClick(e: MouseEvent): void {
    if (!menuOpen) return;

    const targetInMenu = menuRef.current.contains(e.target as Element);
    if (targetInMenu) return;

    setMenuOpen(false);
  }

  // effect for menu open/closing
  useEffect(() => {
    if (!menuOpen) return;

    // check if menu is overflowing
    const ref = menuRef.current.getBoundingClientRect();
    setRightAligned(ref.right > window.innerWidth);
  }, [menuOpen]);

  // effect for adding lifecycle events
  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  });

  return (
    <div
      className={cx(styles.menu, className)}
      onClick={() => setMenuOpen(true)}
      onKeyDown={onEnter(() => setMenuOpen(true))}
      role="button"
      tabIndex={0}
      aria-haspopup
    >
      <More />
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              className={cx(styles.popup, { [styles.right]: rightAligned })}
              key={key}
              ref={menuRef}
              role="menu"
              style={props}
            >
              {items.map(({ action, icon: Icon, text }) => (
                <div
                  className={styles.item}
                  key={text}
                  onClick={e => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    action();
                  }}
                  onKeyDown={onEnter(e => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    action();
                  })}
                  role="menuitem"
                  tabIndex={0}
                >
                  <div className={styles.icon}>{Icon && <Icon />}</div>
                  <div className={styles.text}>{text}</div>
                </div>
              ))}
            </animated.div>
          )
      )}
    </div>
  );
};

export default Menu;
