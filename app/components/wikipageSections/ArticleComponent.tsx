import styles from '@/app/components/wikipageSections/ArticleComponent.module.css';
import {  Typography} from '@mui/material';
import Link from 'next/link';

interface ArticleComponentProps {
  id: number;
  title: string;
  author: string;
  date: string;
  text: string;
  summary: string;
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({
  id,
  title,
  date,
  summary,
}) => {


  return (
    <Link href={`/wiki/${id}`} className={styles.artigoContainer}>
      <Typography variant="h5" className={styles.title}>{title}</Typography>
      <Typography variant="subtitle1" className={styles.authorDate}>By PubMed</Typography>
      <Typography variant="caption" className={styles.authorDate}>{date}</Typography>
      <Typography variant="body2" className={styles.summary}>{summary}</Typography>
    </Link>
  );
};

export default ArticleComponent;
