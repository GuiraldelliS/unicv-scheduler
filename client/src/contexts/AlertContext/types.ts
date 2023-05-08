export type IDefaultAlertProps = {
  title?: string;
  message?: string;
  status?: 'success' | 'error';
};

export type IAlertComponent = React.FC<{
  handleClose: () => void;
}>;

export type IRenderAlert = {
  Component: IAlertComponent;
  defaultAlertProps: IDefaultAlertProps;
  handleClose: () => void;
};

export type OpenArgs = IDefaultAlertProps | IAlertComponent;

export type IAgendamentoContext = {
  open: (props: OpenArgs) => string | void;
  close: (id: string) => void;

  success: (props: Omit<IDefaultAlertProps | string, 'status'>) => string | void;
  error: (props: Omit<IDefaultAlertProps | string, 'status'>) => string | void;
};
