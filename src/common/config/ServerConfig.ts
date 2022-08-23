import { Config } from "$common/utils/Config";

export class ServerConfig extends Config<ServerConfig> {
  @Config.ConfigField("*")
  public cors: string;

  @Config.ConfigField("35.238.148.252")
  public serverHost: string;
  @Config.ConfigField(8080)
  public serverPort: number;
  public serverUrl: string;

  @Config.ConfigField("35.238.148.252")
  public uiHost: string;
  @Config.ConfigField(80)
  public uiPort: number;
  public uiUrl: string;

  @Config.ConfigField("35.238.148.252")
  public socketHost: string;
  @Config.ConfigField(9000)
  public socketPort: number;
  public socketUrl: string;

  @Config.ConfigField(false)
  public serveStaticFile: boolean;

  constructor(configJson) {
    super(configJson);

    this.serverUrl = `${this.serverHost}:${this.serverPort}`;
    this.uiUrl = `${this.uiHost}:${this.uiPort}`;
    this.socketUrl = `${this.socketHost}:${this.socketPort}`;
    this.cors = '*';
  }
}
