"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Gif1 from '../../../public/working from home.gif'
import Image from "next/image";

interface GridItem {
  id: number;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  content: string;
  thumbnail: string;
}

const GridLayout: React.FC = () => {
  const [gridItems] = useState<GridItem[]>([
    { id: 1, size: 'small', content: 'Small grid item', thumbnail: 'https://picsum.photos/300/300?random=1' },
    { id: 2, size: 'wide', content: 'Wide grid item with more content', thumbnail: 'https://picsum.photos/600/300?random=2' },
    { id: 3, size: 'tall', content: 'Tall grid item with even more content to display', thumbnail: 'https://picsum.photos/300/600?random=3' },
    { id: 4, size: 'medium', content: 'Medium grid item', thumbnail: 'https://picsum.photos/400/400?random=4' },
    { id: 5, size: 'small', content: 'Another small item', thumbnail: 'https://picsum.photos/300/300?random=5' },
    { id: 6, size: 'large', content: 'Large grid item with lots of content to show when expanded', thumbnail: 'https://picsum.photos/600/600?random=6' },
  ]);

  const [selected, setSelected] = useState<GridItem | null>(null);

  const handleClick = (item: GridItem) => {
    setSelected(item.id === selected?.id ? null : item);
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small': return 'h-60 col-span-1';
      case 'medium': return 'h-90 col-span-1';
      case 'large': return 'h-120 col-span-2 row-span-1';
      case 'wide': return 'h-60 col-span-2';
      case 'tall': return 'h-120 col-span-1 row-span-1';
      default: return 'h-50 col-span-1';
    }
  };

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto gap-4 relative">
      {gridItems.map((item) => (
        <GridItemComponent
          key={item.id}
          item={item}
          isSelected={selected?.id === item.id}
          onSelect={handleClick}
          sizeClasses={getSizeClasses(item.size)}
        />
      ))}
    </div>
  );
};

const GridItemComponent: React.FC<{
  item: GridItem;
  isSelected: boolean;
  onSelect: (item: GridItem) => void;
  sizeClasses: string;
}> = ({ item, isSelected, onSelect, sizeClasses }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    const element = itemRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <motion.div
      ref={itemRef}
      layoutId={`card-${item.id}`}
      onClick={() => onSelect(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-lg cursor-pointer
        ${sizeClasses}
        ${isSelected ? 'z-50' : 'z-0'}
      `}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          filter: isHovered ? 'grayscale(100%)' : 'grayscale(0%)',
        }}
        transition={{ duration: 0.3 }}
      >
        <Image 
          src={item.thumbnail} 
          alt={`Thumbnail for ${item.content}`}
          layout="fill"
          objectFit="cover"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-teal-500 mix-blend-overlay opacity-0"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          background: isHovered ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.8) 0%, rgba(20, 184, 166, 0.4) 50%, rgba(20, 184, 166, 0) 100%)` : 'none',
        }}
        transition={{ duration: 0.3 }}
      />
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
          >
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
              className="text-white text-center text-sm md:text-base lg:text-lg font-semibold"
            >
              {item.content}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GridLayout;