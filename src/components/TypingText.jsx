import { useState, useEffect } from 'react';

const TypingText = ({ textList, speed = 50, pause = 1500 }) => {
  const [displayed, setDisplayed] = useState('');
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  
  useEffect(() => {
    const current = textList[i];
    if (j < current.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + current[j]);
        setJ((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => {
      setDisplayed('');
      setJ(0);
      setI((prev) => (prev + 1) % textList.length);
    }, pause);
    return () => clearTimeout(timeout);
  }, [i, j, textList, speed, pause]);

  return <span>{displayed}</span>;
};

export default TypingText;
