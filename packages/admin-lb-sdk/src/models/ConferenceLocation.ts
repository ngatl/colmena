/* tslint:disable */
import {
  StorageFile
} from '../index';

declare var Object: any;
export interface ConferenceLocationInterface {
  "id"?: number;
  "domainId"?: string;
  "storageFileId"?: string;
  "title"?: string;
  "Conference"?: string;
  "userId"?: number;
  "fileId"?: string;
  "created"?: Date;
  "modified"?: Date;
  file?: StorageFile;
}

export class ConferenceLocation implements ConferenceLocationInterface {
  "id": number;
  "domainId": string;
  "storageFileId": string;
  "title": string;
  "Conference": string;
  "userId": number;
  "fileId": string;
  "created": Date;
  "modified": Date;
  file: StorageFile;
  constructor(data?: ConferenceLocationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ConferenceLocation`.
   */
  public static getModelName() {
    return "ConferenceLocation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ConferenceLocation for dynamic purposes.
  **/
  public static factory(data: ConferenceLocationInterface): ConferenceLocation{
    return new ConferenceLocation(data);
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
      name: 'ConferenceLocation',
      plural: 'ConferenceLocations',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "domainId": {
          name: 'domainId',
          type: 'string'
        },
        "storageFileId": {
          name: 'storageFileId',
          type: 'string'
        },
        "title": {
          name: 'title',
          type: 'string'
        },
        "Conference": {
          name: 'Conference',
          type: 'string'
        },
        "userId": {
          name: 'userId',
          type: 'number'
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
