export interface ContratoDetalleModel {
  codigoCliente:      number | null;
  estadoGeneral:      string | null;
  dniCliente:         string | null;
  nombresCliente:     string | null;
  direccionCliente:   string | null;
  distritoCliente:    string | null;
  telefonosCliente:   string | null;
  cuentaContrato:     string | null;
  cup:                string | null;
  nroInstalacion:     string | null;
  estadoContrato:     string | null;
  fechaEstado:        string | null;
  asesorComercial:    string | null;
  fechaFirma:         string | null;
  fechaEnvioCalidda:  string | null;
  material:           string | null;
  cantidadPuntos:     string | null;
  nroEnvio:           string | null;
  convenioFise:       string | null;
  estadoRedInterna:   string | null;
}

export type ContratoVentaModel = ContratoDetalleModel;

export interface AdjuntoModel {
  attachmentId:      number;
  codCli:            number;
  automaticFileName: string;
  carpeta:           string;
  manualFileName:    string;
  itemCreationDate:  string;
  itemCreationUser:  string;
}

export interface ContratoVentaFilter {
  Tipo_de_Proyecto?:      number;
  Tipo_de_Proceso?:       string;
  Estado_de_Proceso?:     number;
  Codigo_de_Responsable?: number;
  Tipo_de_Fecha?:         string;
  Fecha_desde?:           string;
  Fecha_hasta?:           string;
  Tipo_de_dato?:          string;
  Valor_dato?:            string;
}

export interface ResponseModel<T> {
  data: T;
  message: string;
  success: boolean;
}
