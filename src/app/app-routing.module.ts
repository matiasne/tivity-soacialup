import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./recuperar-contrasena/recuperar-contrasena.module').then( m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'form-plan',
    loadChildren: () => import('./form-plan/form-plan.module').then( m => m.FormPlanPageModule)
  },
  {
    path: 'list-subscripciones',
    loadChildren: () => import('./list-subscripciones/list-subscripciones.module').then( m => m.ListSubscripcionesPageModule)
  },
  {
    path: 'details-subscripcion',
    loadChildren: () => import('./details-subscripcion/details-subscripcion.module').then( m => m.DetailsSubscripcionPageModule)
  },
  {
    path: 'list-comercios',
    loadChildren: () => import('./list-comercios/list-comercios.module').then( m => m.ListComerciosPageModule)
  },
  {
    path: 'list-invitaciones',
    loadChildren: () => import('./list-invitaciones/list-invitaciones.module').then( m => m.ListInvitacionesPageModule)
  },
  {
    path: 'form-invitacion',
    loadChildren: () => import('./form-invitacion/form-invitacion.module').then( m => m.FormInvitacionPageModule)
  },
  {
    path: 'dashboard-comercio',
    loadChildren: () => import('./dashboard-comercio/dashboard-comercio.module').then( m => m.DashboardComercioPageModule)
  },
  {
    path: 'dashboard-subscripciones',
    loadChildren: () => import('./dashboard-subscripciones/dashboard-subscripciones.module').then( m => m.DashboardSubscripcionesPageModule)
  },
  {
    path: 'dashboard-clientes',
    loadChildren: () => import('./dashboard-clientes/dashboard-clientes.module').then( m => m.DashboardClientesPageModule)
  },
  {
    path: 'dashboard-productos',
    loadChildren: () => import('./dashboard-productos/dashboard-productos.module').then( m => m.DashboardProductosPageModule)
  },
  {
    path: 'add-producto-venta',
    loadChildren: () => import('./add-producto-venta/add-producto-venta.module').then( m => m.AddProductoVentaPageModule)
  },
  {
    path: 'list-productos-servicios',
    loadChildren: () => import('./list-productos-servicios/list-productos-servicios.module').then( m => m.ListProductosServiciosPageModule)
  },
  {
    path: 'form-horario',
    loadChildren: () => import('./form-horario/form-horario.module').then( m => m.FormHorarioPageModule)
  },
  {
    path: 'list-cta-corrientes',
    loadChildren: () => import('./list-cta-corrientes/list-cta-corrientes.module').then( m => m.ListCtaCorrientesPageModule)
  },
  {
    path: 'form-cta-corriente',
    loadChildren: () => import('./form-cta-corriente/form-cta-corriente.module').then( m => m.FormCtaCorrientePageModule)
  },
  {
    path: 'details-cta-corriente',
    loadChildren: () => import('./details-cta-corriente/details-cta-corriente.module').then( m => m.DetailsCtaCorrientePageModule)
  },
  {
    path: 'list-comercios-owner',
    loadChildren: () => import('./list-comercios-owner/list-comercios-owner.module').then( m => m.ListComerciosOwnerPageModule)
  },
  {
    path: 'form-deposito-cta-corriente',
    loadChildren: () => import('./form-deposito-cta-corriente/form-deposito-cta-corriente.module').then( m => m.FormDepositoCtaCorrientePageModule)
  },
  {
    path: 'form-extraccion-cta-corriente',
    loadChildren: () => import('./form-extraccion-cta-corriente/form-extraccion-cta-corriente.module').then( m => m.FormExtraccionCtaCorrientePageModule)
  },
  {
    path: 'form-producto-opcion',
    loadChildren: () => import('./form-producto-opcion/form-producto-opcion.module').then( m => m.FormProductoOpcionPageModule)
  },
  {
    path: 'form-producto-grupo-opciones',
    loadChildren: () => import('./form-producto-grupo-opciones/form-producto-grupo-opciones.module').then( m => m.FormProductoGrupoOpcionesPageModule)
  },
  {
    path: 'list-empleados',
    loadChildren: () => import('./list-empleados/list-empleados.module').then( m => m.ListEmpleadosPageModule)
  },
  {
    path: 'form-comercio-configuracion',
    loadChildren: () => import('./form-comercio-configuracion/form-comercio-configuracion.module').then( m => m.FormComercioConfiguracionPageModule)
  },
  {
    path: 'list-horarios',
    loadChildren: () => import('./list-horarios/list-horarios.module').then( m => m.ListHorariosPageModule)
  },
  {
    path: 'select-empleado',
    loadChildren: () => import('./select-empleado/select-empleado.module').then( m => m.SelectEmpleadoPageModule)
  },
  {
    path: 'select-cliente',
    loadChildren: () => import('./select-cliente/select-cliente.module').then( m => m.SelectClientePageModule)
  },
  {
    path: 'form-pedidos-configuracion',
    loadChildren: () => import('./form-pedidos-configuracion/form-pedidos-configuracion.module').then( m => m.FormPedidosConfiguracionPageModule)
  },
  {
    path: 'recortar-imagen',
    loadChildren: () => import('./recortar-imagen/recortar-imagen.module').then( m => m.RecortarImagenPageModule)
  },
  {
    path: 'list-notificaciones',
    loadChildren: () => import('./list-notificaciones/list-notificaciones.module').then( m => m.ListNotificacionesPageModule)
  },
  {
    path: 'details-whatsapp',
    loadChildren: () => import('./details-whatsapp/details-whatsapp.module').then( m => m.DetailsWhatsappPageModule)
  },
  {
    path: 'servicio-calendario',
    loadChildren: () => import('./servicio-calendario/servicio-calendario.module').then( m => m.ServicioCalendarioPageModule)
  },
  {
    path: 'list-personal',
    loadChildren: () => import('./list-personal/list-personal.module').then( m => m.ListPersonalPageModule)
  },
  {
    path: 'form-estilo-configuracion',
    loadChildren: () => import('./form-estilo-configuracion/form-estilo-configuracion.module').then( m => m.FormEstiloConfiguracionPageModule)
  },
  {
    path: 'form-stock',
    loadChildren: () => import('./form-stock/form-stock.module').then( m => m.FormStockPageModule)
  },
  {
    path: 'form-cocina',
    loadChildren: () => import('./form-cocina/form-cocina.module').then( m => m.FormCocinaPageModule)
  },
  {
    path: 'select-cocina',
    loadChildren: () => import('./select-cocina/select-cocina.module').then( m => m.SelectCocinaPageModule)
  },
  {
    path: 'form-impresora-config',
    loadChildren: () => import('./form-impresora-config/form-impresora-config.module').then( m => m.FormImpresoraConfigPageModule)
  },
  {
    path: 'list-grupos-opciones',
    loadChildren: () => import('./list-grupos-opciones/list-grupos-opciones.module').then( m => m.ListGruposOpcionesPageModule)
  },
  {
    path: 'select-grupos-opciones',
    loadChildren: () => import('./select-grupos-opciones/select-grupos-opciones.module').then( m => m.SelectGruposOpcionesPageModule)
  },
  {
    path: 'list-comandas-v2',
    loadChildren: () => import('./list-comandas-v2/list-comandas-v2.module').then( m => m.ListComandasV2PageModule)
  },
  {
    path: 'form-descuento',
    loadChildren: () => import('./form-descuento/form-descuento.module').then( m => m.FormDescuentoPageModule)
  },
  {
    path: 'form-recargo',
    loadChildren: () => import('./form-recargo/form-recargo.module').then( m => m.FormRecargoPageModule)
  },
  {
    path: 'form-woocommerce-configuracion',
    loadChildren: () => import('./form-woocommerce-configuracion/form-woocommerce-configuracion.module').then( m => m.FormWoocommerceConfiguracionPageModule)
  },
  {
    path: 'ticket-detalle',
    loadChildren: () => import('./impresiones/ticket-detalle/ticket-detalle.module').then( m => m.TicketDetallePageModule)
  },
  {
    path: 'comanda',
    loadChildren: () => import('./impresiones/comanda/comanda.module').then( m => m.ComandaPageModule)
  },
  {
    path: 'cambiar-plan',
    loadChildren: () => import('./cambiar-plan/cambiar-plan.module').then( m => m.CambiarPlanPageModule)
  },   {
    path: 'form-beneficio',
    loadChildren: () => import('./form-beneficio/form-beneficio.module').then( m => m.FormBeneficioPageModule)
  },
  {
    path: 'list-beneficios',
    loadChildren: () => import('./list-beneficios/list-beneficios.module').then( m => m.ListBeneficiosPageModule)
  },
  {
    path: 'select-beneficio',
    loadChildren: () => import('./select-beneficio/select-beneficio.module').then( m => m.SelectBeneficioPageModule)
  },
  {
    path: 'select-product',
    loadChildren: () => import('./select-product/select-product.module').then( m => m.SelectProductPageModule)
  },
  {
    path: 'details-pedido-woocommerce',
    loadChildren: () => import('./details-pedido-woocommerce/details-pedido-woocommerce.module').then( m => m.DetailsPedidoWoocommercePageModule)
  },
  {
    path: 'form-filter-pedidos',
    loadChildren: () => import('./form-filter-pedidos/form-filter-pedidos.module').then( m => m.FormFilterPedidosPageModule)
  },
  {
    path: 'details-image',
    loadChildren: () => import('./details-image/details-image.module').then( m => m.DetailsImagePageModule)
  },
  {
    path: 'modal-notificacion',
    loadChildren: () => import('./modal-notificacion/modal-notificacion.module').then( m => m.ModalNotificacionPageModule)
  },
  {
    path: 'modal-input-direccion',
    loadChildren: () => import('./modal-input-direccion/modal-input-direccion.module').then( m => m.ModalInputDireccionPageModule)
  },
  {
    path: 'form-configuracion-afip',
    loadChildren: () => import('./form-configuracion-afip/form-configuracion-afip.module').then( m => m.FormConfiguracionAfipPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'form-user',
    loadChildren: () => import('./form-user/form-user.module').then( m => m.FormUserPageModule)
  },
  {
    path: 'list-select-bluetooth-device',
    loadChildren: () => import('./list-select-bluetooth-device/list-select-bluetooth-device.module').then( m => m.ListSelectBluetoothDevicePageModule)
  },
  {
    path: 'form-impresora',
    loadChildren: () => import('./form-impresora/form-impresora.module').then( m => m.FormImpresoraPageModule)
  },
  {
    path: 'dashboard-reservas',
    loadChildren: () => import('./dashboard-reservas/dashboard-reservas.module').then( m => m.DashboardReservasPageModule)
  },
  {
    path: 'form-config-mercadopago',
    loadChildren: () => import('./form-config-mercadopago/form-config-mercadopago.module').then( m => m.FormConfigMercadopagoPageModule)
  },
  {
    path: 'form-subscripcion',
    loadChildren: () => import('./form-subscripcion/form-subscripcion.module').then( m => m.FormSubscripcionPageModule)
  },
  {
    path: 'form-importar-catalogo-csv',
    loadChildren: () => import('./form-importar-catalogo-csv/form-importar-catalogo-csv.module').then( m => m.FormImportarCatalogoCsvPageModule)
  },
  {
    path: 'form-personal-permisos',
    loadChildren: () => import('./form-personal-permisos/form-personal-permisos.module').then( m => m.FormPersonalPermisosPageModule)
  },
  {
    path: 'select-personal',
    loadChildren: () => import('./select-personal/select-personal.module').then( m => m.SelectPersonalPageModule)
  },
  {
    path: 'form-card-token',
    loadChildren: () => import('./form-card-token/form-card-token.module').then( m => m.FormCardTokenPageModule)
  },
  {
    path: 'a-con-resp-inscripto',
    loadChildren: () => import('./impresiones/facturas/a-con-resp-inscripto/a-con-resp-inscripto.module').then( m => m.AConRespInscriptoPageModule)
  },
  {
    path: 'a-con-resp-no-inscripto',
    loadChildren: () => import('./impresiones/facturas/a-con-resp-no-inscripto/a-con-resp-no-inscripto.module').then( m => m.AConRespNoInscriptoPageModule)
  },
  {
    path: 'b-con-consumidor-final',
    loadChildren: () => import('./impresiones/facturas/b-con-consumidor-final/b-con-consumidor-final.module').then( m => m.BConConsumidorFinalPageModule)
  },
  {
    path: 'c-con-consumidor-final',
    loadChildren: () => import('./impresiones/facturas/c-con-consumidor-final/c-con-consumidor-final.module').then( m => m.CConConsumidorFinalPageModule)
  },
  {
    path: 'ticket-factura',
    loadChildren: () => import('./impresiones/facturas/ticket-factura/ticket-factura.module').then( m => m.TicketFacturaPageModule)
  },
  {
    path: 'form-estado-reserva',
    loadChildren: () => import('./form-estado-reserva/form-estado-reserva.module').then( m => m.FormEstadoReservaPageModule)
  },
  {
    path: 'form-subdivision',
    loadChildren: () => import('./form-subdivision/form-subdivision.module').then( m => m.FormSubdivisionPageModule)
  },
  {
    path: 'form-division',
    loadChildren: () => import('./form-division/form-division.module').then( m => m.FormDivisionPageModule)
  },
  {
    path: 'select-division',
    loadChildren: () => import('./select-division/select-division.module').then( m => m.SelectDivisionPageModule)
  },
  {
    path: 'dashboard-pedidos',
    loadChildren: () => import('./dashboard-pedidos/dashboard-pedidos.module').then( m => m.DashboardPedidosPageModule)
  },
  {
    path: 'dashboard-division',
    loadChildren: () => import('./dashboard-division/dashboard-division.module').then( m => m.DashboardDivisionPageModule)
  },
  {
    path: 'edit-cliente',
    loadChildren: () => import('./edit-cliente/edit-cliente.module').then( m => m.EditClientePageModule)
  },
  {
    path: 'edit-comercio',
    loadChildren: () => import('./edit-comercio/edit-comercio.module').then( m => m.EditComercioPageModule)
  },
  {
    path: 'edit-reserva',
    loadChildren: () => import('./edit-reserva/edit-reserva.module').then( m => m.EditReservaPageModule)
  },
  {
    path: 'edit-pedido',
    loadChildren: () => import('./edit-pedido/edit-pedido.module').then( m => m.EditPedidoPageModule)
  },
  {
    path: 'dashboard-caja',
    loadChildren: () => import('./dashboard-caja/dashboard-caja.module').then( m => m.DashboardCajaPageModule)
  },
  {
    path: 'edit-producto',
    loadChildren: () => import('./edit-producto/edit-producto.module').then( m => m.EditProductoPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'select-caja',
    loadChildren: () => import('./select-caja/select-caja.module').then( m => m.SelectCajaPageModule)
  },
  {
    path: 'edit-caja',
    loadChildren: () => import('./edit-caja/edit-caja.module').then( m => m.EditCajaPageModule)
  },
  {
    path: 'edit-caja-apertura',
    loadChildren: () => import('./edit-caja-apertura/edit-caja-apertura.module').then( m => m.EditCajaAperturaPageModule)
  },
  {
    path: 'edit-caja-cierre',
    loadChildren: () => import('./edit-caja-cierre/edit-caja-cierre.module').then( m => m.EditCajaCierrePageModule)
  },
  {
    path: 'edit-caja-egreso',
    loadChildren: () => import('./edit-caja-egreso/edit-caja-egreso.module').then( m => m.EditCajaEgresoPageModule)
  },
  {
    path: 'edit-caja-ingreso',
    loadChildren: () => import('./edit-caja-ingreso/edit-caja-ingreso.module').then( m => m.EditCajaIngresoPageModule)
  },
  {
    path: 'cobrar-pedido',
    loadChildren: () => import('./cobrar-pedido/cobrar-pedido.module').then( m => m.CobrarPedidoPageModule)
  },
  {
    path: 'devolver-pedido',
    loadChildren: () => import('./devolver-pedido/devolver-pedido.module').then( m => m.DevolverPedidoPageModule)
  },
  {
    path: 'edit-item-categoria',
    loadChildren: () => import('./edit-item-categoria/edit-item-categoria.module').then( m => m.EditItemCategoriaPageModule)
  },
  {
    path: 'edit-cocina',
    loadChildren: () => import('./edit-cocina/edit-cocina.module').then( m => m.EditCocinaPageModule)
  },
  {
    path: 'edit-comanda',
    loadChildren: () => import('./edit-comanda/edit-comanda.module').then( m => m.EditComandaPageModule)
  },
  {
    path: 'select-categoria',
    loadChildren: () => import('./select-categoria/select-categoria.module').then( m => m.SelectCategoriaPageModule)
  },
  {
    path: 'select-reserva-estados',
    loadChildren: () => import('./select-reserva-estados/select-reserva-estados.module').then( m => m.SelectReservaEstadosPageModule)
  },















];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
