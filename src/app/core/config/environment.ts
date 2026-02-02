export class Environment {
  // URL base de la API
  static readonly API_BASE_URL = 'api';

  // Endpoints específicos
  static readonly USERS = `${Environment.API_BASE_URL}/users/obtener/`;
  static readonly ROLES = `${Environment.API_BASE_URL}/roles/`;
  static readonly GUIAS = `${Environment.API_BASE_URL}/guias/`;

  // Gestion guias
  static readonly INFO_GUIAS = `${Environment.API_BASE_URL}/gestionGuias/obtener-planilla-detalles/`;
  static readonly DETAILS_GUIDE = `${Environment.API_BASE_URL}/planilla-detalle/obtener-detalle-guia`;

  // Consignaciones
  static readonly SEND_CONSIGNACIONES = `${Environment.API_BASE_URL}/consignaciones/crear/`;
  static readonly GET_ALL_CONSIGNACIONES  = `${Environment.API_BASE_URL}/consignaciones/obtener-consignaciones/`;
  static readonly GET_GROUP_PARAMETROS  = `${Environment.API_BASE_URL}/consignaciones/group-paramtros/`;
  static readonly DELETE_CONSIGNACIONES = `${Environment.API_BASE_URL}/consignaciones/eliminar`;
  static readonly VIEW_IMAGE_AZURE = `${Environment.API_BASE_URL}/consignaciones/public-azure/`;

  // Planilla detalle 
  static readonly TOTALS_STATIC_GUIDE =  `${Environment.API_BASE_URL}/planilla-detalle/obtener-total-guias/`;
  static readonly GET_GROUP_PARAMTER_DETALLE = `${Environment.API_BASE_URL}/planilla-detalle/obtener-parametros-guias/`;
  static readonly GET_GUIDE_BY_NUMERO_GUIDE = `${Environment.API_BASE_URL}/planilla-detalle/obtener-detalle-numero-guia`;


  // Planilla detalle facturas 
  static readonly GET_PLANILLA_DETALLE_FACTURAS = `${Environment.API_BASE_URL}/planilla-detalle-facturas/obtener-planilla-detalles-facturas`;

  // Ape informacion de facturas por deireccion 
  static readonly GET_INFO_FACUTRA_POR_DIRECCION =  `${Environment.API_BASE_URL}/direcciones/ws-calculos-detalle-factura/560/?entregados=true`;
}
