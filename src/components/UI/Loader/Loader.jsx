import React, { useEffect, useRef } from 'react';
import { useStore } from '../../../store';
import styles from './Loader.module.scss';
export const Loader = () => {
  const countRef = useRef(0);
  const listRef = useRef(null);
  const { setLoadingLoader } = useStore();

  useEffect(() => {
    const interval = setInterval(() => {
      countRef.current += 1;

      if (countRef.current === 7) {
        clearInterval(interval);
        setLoadingLoader(false);
        return;
      }

      listRef.current.style.transform = `translateY(${
        -70 * countRef.current
      }rem)`;
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.loader}>
      <div className={styles.loader_figure}>
        <div className={styles.loader_wrapper}>
          <div ref={listRef} className={styles.loader_words}>
            <div className={`${styles.loader_word} ${styles.word}`}>
              <div className="word_content">Tesla Roadster</div>
            </div>
            <div className={`${styles.loader_word} ${styles.word}`}>
              <div className="word_content">New Horizons</div>
            </div>
            <div className={`${styles.loader_word} ${styles.word}`}>
              <div className="word_content">Juno</div>
            </div>
            <div className={`${styles.loader_word} ${styles.word}`}>
              <div className="word_content">Tianwen 1</div>
            </div>
            <div className={`${styles.loader_word} ${styles.word}`}>
              <div className="word_content">Mars 2020</div>
            </div>
            <div className={`${styles.loader_word} ${styles.word}`}>
              <div className="word_content">Hubble</div>
            </div>
            <div className={`${styles.loader_word} ${styles.word}`}>
              <div className="word_content">Now in space</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
