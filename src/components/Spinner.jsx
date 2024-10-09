import { Spin } from 'antd';
import { useEffect, useState } from 'react';

export default function Spinner({ isActive }) {
  const [spinning, setSpinning] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (isActive) {
      setSpinning(true);
      let ptg = -10;
      const interval = setInterval(() => {
        ptg += 5;
        setPercent(ptg);
        if (ptg > 100) {
          clearInterval(interval);
          setSpinning(false);
          setPercent(0);
        }
      }, 100);
    } else {
      setSpinning(false);
      setPercent(0);
    }
  }, [isActive]);

  return (
    <Spin spinning={spinning} percent={percent} fullscreen />
  );
}
