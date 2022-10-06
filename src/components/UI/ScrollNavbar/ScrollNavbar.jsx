import { ScrollBarLink } from '../ScrollBarLink/ScrollBarLink';
import styles from './ScrollNavbar.module.scss';

export const ScrollNavbar = ({ data = [], isMissions = false }) => {
  return (
    <nav className={styles['scroll-nav']}>
      <div className="container container--scroll">
        <ul className={styles['scroll-nav_list']}>
          {data.map((el) => (
            <li key={el.name} className={styles['scroll-nav_item']}>
              <ScrollBarLink to={el.name} isClickable={!isMissions}>
                {el.name}
              </ScrollBarLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
