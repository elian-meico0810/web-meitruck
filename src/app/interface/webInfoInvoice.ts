export interface ResponseConsignacion<T = any> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}

export interface PedidoDetalle {
    pedidoDetalleId?: number;
    linea?: number;
    codigo?: string;
    nombre?: string;
    precioUnitario?: number;
    unidadesRechazadas?: number;
    totalDineroEntrega?: number;
    totalImpuestos?: number;
    unidadesEntregadas?: number;
}

export interface PedidoData {
    id: number;
    codigo: string;
    bodega: string;
    fecha: string;
    canal: string;
    codigoCliente: string;
    codigoGuia: string;
    dfr: number;
    porcentajeDFR: number;
    numero_factura: string;
}

export interface DataPayment {
    id: number;
    valor: string;
    numeroDeposito: string;
    nombreArchivo: string;
    metodoPago: string;
    fechaReporte: string;
    numeroDocumento: string;
    estado: string;
    referencia: string;
    referencia_meico: string;
}

export interface PedidoDetalleData {
    total_impuestos?: number;
    valor_base_producto?: number;
    unidades_solicitadas?: number;
    unidades_rechazadas?: number;
    codigo_producto?: string;
    nombre_producto?:string;
    unidades_entregadas?: number;
}

export interface PlanillaDetalleFacturasData {
    delivery: PedidoDetalle[];
    refused: PedidoDetalle[];
    pedidos_data: PedidoData;
    data_payment: DataPayment[];
    pedidos_detalle_data: PedidoDetalleData[];

}

export type PlanillaDetalleFacturasResponse = ResponseConsignacion<PlanillaDetalleFacturasData>;

