/* tslint:disable */

declare var Object: any;
export interface ConferenceSponsorInterface {
  "name": string;
  "imageUrl"?: string;
  "description"?: string;
  "website"?: string;
  "level"?: string;
  "id"?: number;
  "created"?: Date;
  "modified"?: Date;
}

export class ConferenceSponsor implements ConferenceSponsorInterface {
  "name": string;
  "imageUrl": string;
  "description": string;
  "website": string;
  "level": string;
  "id": number;
  "created": Date;
  "modified": Date;
  constructor(data?: ConferenceSponsorInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ConferenceSponsor`.
   */
  public static getModelName() {
    return "ConferenceSponsor";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ConferenceSponsor for dynamic purposes.
  **/
  public static factory(data: ConferenceSponsorInterface): ConferenceSponsor{
    return new ConferenceSponsor(data);
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
      name: 'ConferenceSponsor',
      plural: 'ConferenceSponsors',
      properties: {
        "name": {
          name: 'name',
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
        "level": {
          name: 'level',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
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
      }
    }
  }
}
