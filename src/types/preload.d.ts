interface Window {
  shareDuck: {
    on: (
      channel: string,
      listener: (event: IpcRendererEvent, ...args: any[]) => void
    ) => IpcRenderer;
    off: (
      channel: string,
      listener: (event: IpcRendererEvent, ...args: any[]) => void
    ) => IpcRenderer;
    invoke: (channel: string, ...args: any[]) => Promise<any>;
    send: (channel: string, ...args: any[]) => void;
  };
}
