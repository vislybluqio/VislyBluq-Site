import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * Renders a list where the item nearest the middle of the screen is highlighted and the rest are
 * dimmed, so a sequence reads one step at a time as you scroll. Everything is fully visible until
 * the page runs.
 */
export const ScrollSteps = ({
  items,
  renderItem,
  className = '',
  itemClassName = '',
}: {
  items: Array<[string, string]>;
  renderItem: (item: [string, string], index: number, active: boolean) => ReactNode;
  className?: string;
  itemClassName?: string;
}) => {
  const refs = useRef<Array<HTMLLIElement | null>>([]);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.55;
      let current = 0;
      refs.current.forEach((element, index) => {
        if (element && element.getBoundingClientRect().top < line) current = index;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol className={className}>
      {items.map((item, index) => (
        <li
          key={item[0]}
          ref={(element) => {
            refs.current[index] = element;
          }}
          className={`${itemClassName} transition-opacity duration-500 ${active === null || active === index ? 'opacity-100' : 'opacity-30'}`}
        >
          {renderItem(item, index, active === index)}
        </li>
      ))}
    </ol>
  );
};
