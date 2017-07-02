import { InjectionToken } from '@angular/core';
/**
 * This token is required by each platform.
 * It should be provided with each platforms socket implementation.
 */
export const SocketIOToken = new InjectionToken('socket-io');
/**
 * @module SocketDriver
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The SocketDriver class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 **/
export class SocketDriver {
  connect(url: any, options: any) {}
}
