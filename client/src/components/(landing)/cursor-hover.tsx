'use client'
import styles from './cursor-hover.module.scss'
import { useState } from 'react';  
import { motion } from 'framer-motion';
import useMousePosition from '@/utils/use-mouse-position';

const CursorHover: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 200 : 20;

  return (
    <main className={styles.main}>
      <motion.div 
        className={styles.mask}
        animate={{
          WebkitMaskPosition: `${x! - (size / 2)}px ${y! - (size / 2)}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p 
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
           Transform your ideas into engaging LinkedIn posts effortlessly—generate content from prompts, blog URLs, YouTube videos, and PDFs!
        </p>
      </motion.div>

      <div className={styles.body}>
        <p>Unlock the <span> power of AI </span> to create impactful LinkedIn posts that resonate with your audience. Grow Your audience much faster</p>
      </div>
    </main>
  )
}

export default CursorHover;
