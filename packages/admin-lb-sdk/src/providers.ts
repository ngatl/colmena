// modules
import { JSONSearchParams } from './services/core/search.params';
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { SocketConnection } from './sockets/socket.connections';
import { RealTime } from './services/core/real.time';
import { EmailApi } from './services/custom/Email';
import { StorageContainerApi } from './services/custom/StorageContainer';
import { SystemApi } from './services/custom/System';
import { ContentEventApi } from './services/custom/ContentEvent';
import { ContentPageApi } from './services/custom/ContentPage';
import { ContentProductApi } from './services/custom/ContentProduct';
import { ContentPostApi } from './services/custom/ContentPost';
import { StorageFileApi } from './services/custom/StorageFile';
import { SystemDomainApi } from './services/custom/SystemDomain';
import { SystemSettingApi } from './services/custom/SystemSetting';
import { SystemUserApi } from './services/custom/SystemUser';
import { ConferenceEventApi } from './services/custom/ConferenceEvent';
import { ConferenceLocationApi } from './services/custom/ConferenceLocation';
import { ConferenceSpeakerApi } from './services/custom/ConferenceSpeaker';
import { ConferenceSponsorApi } from './services/custom/ConferenceSponsor';
import { PingApi } from './services/custom/Ping';
import { MetaApi } from './services/custom/Meta';

/**
 * Reusable providers block for various module types.
 * A platform agnostic module and a browser specific module are provided.
 */
export const SDK_PROVIDERS: any[] = [
  LoopBackAuth,
  LoggerService,
  JSONSearchParams,
  SDKModels,
  RealTime,
  ErrorHandler,
  SocketConnection,
  EmailApi,
  StorageContainerApi,
  SystemApi,
  ContentEventApi,
  ContentPageApi,
  ContentProductApi,
  ContentPostApi,
  StorageFileApi,
  SystemDomainApi,
  SystemSettingApi,
  SystemUserApi,
  ConferenceEventApi,
  ConferenceLocationApi,
  ConferenceSpeakerApi,
  ConferenceSponsorApi,
  PingApi,
  MetaApi,
];
