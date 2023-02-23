export type SundayComponent = React.FC & {
  config: {
    schema: any;
    type: string;
    label: string;
    component: any;
    layoutExtra?: {
      minW: number;
      minH: number;
      w: number;
      h: number;
    },
    icon?: React.ReactNode
  };
};
