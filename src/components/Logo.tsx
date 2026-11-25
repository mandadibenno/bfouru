import { Glyph } from './Glyph';
import styles from './Logo.module.css';

/**
 * Proposed BFourU website identity: a 2×2 modular mark (one brand, multiple solutions)
 * with the BFourU wordmark. Replace this component if an official logo exists.
 */
export function Logo({ tone = 'ink', size = 'md' }: { tone?: 'ink' | 'paper'; size?: 'md' | 'lg' }) {
  return (
    <span className={`${styles.logo} ${styles[tone]} ${styles[size]}`}>
      <Glyph cells={['tl', 'ci', 'sq', 'br']} accent={1} size="1em" className={styles.mark} />
      <span className={styles.word}>BFourU</span>
    </span>
  );
}
