/// <reference path="bridge.d.ts" />

declare namespace WeixinJSBridge {
  export function call (): never;
  export function invoke (message: string, options: wx.WXInvokeOptions, callback: (res: wx.WXBridgeResponse) => void): void;
  export function log (message: any): void;
  export function on (event?: string, listener?: (res: wx.WXBridgeResponse) => void): void;
}
