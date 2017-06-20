/* tslint:disable */
import {
  StorageFile
} from '../index';

declare var Object: any;
export interface ConferenceSpeakerInterface {
  "id"?: number;
  "name": string;
  "company"?: string;
  "imageUrl"?: string;
  "description"?: string;
  "website"?: string;
  "twitter"?: string;
  "github"?: string;
  "stackoverflow"?: string;
  "fileId"?: string;
  "created"?: Date;
  "modified"?: Date;
  file?: StorageFile;
}

export class ConferenceSpeaker implements ConferenceSpeakerInterface {
  "id": number;
  "name": string;
  "company": string;
  "imageUrl": string;
  "description": string;
  "website": string;
  "twitter": string;
  "github": string;
  "stackoverflow": string;
  "fileId": string;
  "created": Date;
  "modified": Date;
  file: StorageFile;
  constructor(data?: ConferenceSpeakerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ConferenceSpeaker`.
   */
  public static getModelName() {
    return "ConferenceSpeaker";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ConferenceSpeaker for dynamic purposes.
  **/
  public static factory(data: ConferenceSpeakerInterface): ConferenceSpeaker{
    return new ConferenceSpeaker(data);
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
      name: 'ConferenceSpeaker',
      plural: 'ConferenceSpeakers',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "company": {
          name: 'company',
          type: 'string'
        },
        "imageUrl": {
          name: 'imageUrl',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "website": {
          name: 'website',
          type: 'string'
        },
        "twitter": {
          name: 'twitter',
          type: 'string'
        },
        "github": {
          name: 'github',
          type: 'string'
        },
        "stackoverflow": {
          name: 'stackoverflow',
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
