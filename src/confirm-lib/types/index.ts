export type ConfirmDialogProps<P, R> = {
  dismiss: () => void;
  proceed: (value: R) => void;
  cancel: (value?: any) => void;
  show: boolean;
} & P;

export interface CustomConfirmOpts {
  title: string;
  confirmation: string;
  cancelLabel?: string;
  okLabel?: string;
}
