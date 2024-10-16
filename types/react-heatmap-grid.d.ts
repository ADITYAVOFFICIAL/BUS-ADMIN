declare module 'react-heatmap-grid' {
    import { ComponentType } from 'react';
  
    interface HeatMapProps {
      xLabels: string[];
      yLabels: string[];
      data: number[][];
      backgroundColor?: string;
      cellStyle?: (background: string, value: number) => React.CSSProperties;
      cellRender?: (value: number) => React.ReactNode;
    }
  
    const HeatMap: ComponentType<HeatMapProps>;
  
    export default HeatMap;
  }