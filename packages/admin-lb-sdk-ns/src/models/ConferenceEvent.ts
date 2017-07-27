/* tslint:disable */
import {
  StorageFile
} from '../index';

declare var Object: any;
export interface ConferenceEventInterface {
  "id"?: number;
  "storageFileId"?: string;
  "name": string;
  "date"?: Date;
  "location"?: string;
  "fileId"?: string;
  "created"?: Date;
  "modified"?: Date;
  file?: StorageFile;
}

export class ConferenceEvent implements ConferenceEventInterface {
  "id": number;
  "storageFileId": string;
  "name": string;
  "date": Date;
  "location": string;
  "fileId": string;
  "created": Date;
  "modified": Date;
  file: StorageFile;
  constructor(data?: ConferenceEventInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ConferenceEvent`.
   */
  public static getModelName() {
    return "ConferenceEvent";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ConferenceEvent for dynamic purposes.
  **/
  public static factory(data: ConferenceEventInterface): ConferenceEvent{
    return new ConferenceEvent(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'ConferenceEvent',
      plural: 'ConferenceEvents',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "storageFileId": {
          name: 'storageFileId',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "date": {
          name: 'date',
          type: 'Date'
        },
        "location": {
          name: 'location',
          type: 'string'
        },
        "fileId": {
          name: 'fileId',
          type: 'string'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "modified": {
          name: 'modified',
          type: 'Date'
        },
      },
      relations: {
        file: {
          name: 'file',
          type: 'StorageFile',
          model: 'StorageFile'
        },
      }
    }
  }
}
