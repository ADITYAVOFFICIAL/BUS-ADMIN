declare module 'jspdf' {
    import { jsPDF } from 'jspdf';
  
    export interface jsPDF {
      autoTable: (options: any) => void; // You can replace 'any' with a more specific type if needed.
    }
  }
  