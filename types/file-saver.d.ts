declare module 'file-saver' {
    export function saveAs(data: Blob | File | string | ArrayBuffer, filename?: string, options?: any): void;
  }