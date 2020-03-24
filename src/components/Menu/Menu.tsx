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
    from: { height: '2.5rem', opacity: 0 },
    leave: { height: '2.5rem', opacity: 0 },
    enter: { height: `${items.length * 2.5}rem`, opacity: 1 },
    config: {
      duration: 125
    },
    onDestroyed: () => {
      if (!menuOpen) {
        setRightAligned(false);
      }
    }
  });

  function handleClick(e: MouseEvent): void {
    if (!menuOpen) return;

    const targetInMenu = menuRef.current.contains(e.target as Element);
    if (targetInMenu) return;

    setMenuOpen(false);
  }

  // Effect for menu open/closing
  useEffect(() => {
    if (!menuOpen) return;

    // check if menu is overflowing
    const ref = menuRef.current.getBoundingClientRect();
    setRightAligned(ref.right > window.innerWidth);
  }, [menuOpen]);

  // Effect for adding lifecycle events
  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  });

  return (
    <div
      className={cx(styles.menu, className)}
      aria-haspopup
      tabIndex={0}
      role="button"
      onClick={() => setMenuOpen(true)}
      onKeyDown={onEnter(() => setMenuOpen(true))}
    >
      <More />
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              className={cx(styles.popup, { [styles.right]: rightAligned })}
              role="menu"
              ref={menuRef}
              key={key}
              style={props}
            >
              {items.map(({ action, icon: Icon, text }) => (
                <div
                  className={styles.item}
                  role="menuitem"
                  tabIndex={0}
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
