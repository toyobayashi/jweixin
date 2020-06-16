declare namespace wx {
  export interface WXInvokeOptions {
    name?: string;
    arg?: { [key: string]: any };
    [key: string]: any;
  }

  export interface WXBridgeResponse {
    err_code?: any;
    err_desc?: any;
    err_detail?: any;
    errMsg?: string;
    err_msg?: string;
    [key: string]: any;
  }
}
