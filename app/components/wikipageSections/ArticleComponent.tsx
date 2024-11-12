import React, { useState } from 'react';
import styles from '@/app/components/wikipageSections/ArticleComponent.module.css';
import { Modal, Box, Typography} from '@mui/material';
import Button from '@/app/components/button/button'

interface ArticleComponentProps {
  title: string;
  author: string;
  date: string;
  text: string;
  summary: string;
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({
  title,
  author,
  date,
  text,
  summary,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Display main content */}
      <div onClick={handleOpen} className={styles.artigoContainer}>
        <Typography variant="h5" className={styles.title}>{title}</Typography>
        <Typography variant="subtitle1" className={styles.authorDate}>By {author}</Typography>
        <Typography variant="caption" className={styles.authorDate}>{date}</Typography>
        <Typography variant="body2" className={styles.summary}>{summary}</Typography>
      </div>

      {/* Centered modal with margins */}
      <Modal open={open} onClose={handleClose} aria-labelledby="article-modal-title">
        <Box className={styles.modalContainer}>
          <Box className={styles.a4Format}>
            <Typography id="article-modal-title" variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="subtitle1">By {author}</Typography>
            <Typography variant="caption">{date}</Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {summary}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {text}
            </Typography>
            <br/>
            <Button onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ArticleComponent;
