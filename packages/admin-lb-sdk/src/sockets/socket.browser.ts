/* tslint:disable */
import { InjectionToken, Inject } from '@angular/core';
import { SocketIOToken } from './socket.driver';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketBrowser
* @license MIT
* @description
* This module handle socket connections for web browsers, it will be DI Swapped
* depending on the platform environment.
* This module will be generated when the -d ng2web flag is set
**/
export class SocketBrowser {
  constructor(@Inject(SocketIOToken) private io) { }
  /**
   * @method connect
   * @param {string} url URL path to connect with the server.
   * @param {any} options Any socket.io v1 =< valid options
   * @return {any} Not currently a socket.io-client for web Typings implemented.
   * @description
   * This method will return a valid socket connection.
   **/
  connect(url: string, options: any): any {
    return this.io(url, options);
  }
}
