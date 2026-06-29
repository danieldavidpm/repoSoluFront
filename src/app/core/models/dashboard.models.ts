export interface AvanceTrimestralItem {
  mes: string;
  total: number;
}

export interface DashboardData {
  aprobadosMes: number;
  pendienteVenta: number;
  pendienteRedInterna: number;
  pendienteHabilitacion: number;
  avanceVentasTrimestral: AvanceTrimestralItem[];
  avanceHabilitacionTrimestral: AvanceTrimestralItem[];
}
