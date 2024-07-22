export interface ToastBodyProps {
  clss: string;
  titl: string;
};

export interface ToastRootData {
  clss: string;
  text: string;
  titl: string;
};

export interface ToastRootState {
  dict: Map<number, ToastRootData>;
  size: number;
};
