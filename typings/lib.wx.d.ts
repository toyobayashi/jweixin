declare namespace wx {
  export type Method =
    'updateAppMessageShareData' |
    'updateTimelineShareData' |
    // 'onMenuShareTimeline' |
    // 'onMenuShareAppMessage' |
    // 'onMenuShareQQ' |
    // 'onMenuShareWeibo' |
    // 'onMenuShareQZone' |
    'startRecord' |
    'stopRecord' |
    'onVoiceRecordEnd' |
    'playVoice' |
    'pauseVoice' |
    'stopVoice' |
    'onVoicePlayEnd' |
    'uploadVoice' |
    'downloadVoice' |
    'chooseImage' |
    'previewImage' |
    'uploadImage' |
    'downloadImage' |
    'getLocalImgData' |
    'translateVoice' |
    'getNetworkType' |
    'openLocation' |
    'getLocation' |
    'hideOptionMenu' |
    'showOptionMenu' |
    'hideMenuItems' |
    'showMenuItems' |
    'hideAllNonBaseMenuItem' |
    'showAllNonBaseMenuItem' |
    'closeWindow' |
    'scanQRCode' |
    'chooseWXPay' |
    'openProductSpecificView' |
    'addCard' |
    'chooseCard' |
    'openCard';

  interface CommonResponse {
    errMsg: string;
  }

  interface CommonOptions<
    SuccessResponse extends CommonResponse = CommonResponse,
    FailResponse extends CommonResponse = CommonResponse,
    TriggerResponse extends CommonResponse = CommonResponse
  > {
    success? (res: SuccessResponse): void;
    fail? (res: FailResponse): void;
    complete? (res: SuccessResponse & FailResponse): void;
    cancel? (res: SuccessResponse & FailResponse): void;
    trigger? (res: TriggerResponse): void;
  }

  export interface ConfigOptions {
    /**
     * 公众号的唯一标识
     */
    appId: string;
    /**
     * 生成签名的时间戳
     */
    timestamp: number;
    /**
     * 生成签名的随机串
     */
    nonceStr: string;
    /**
     * 签名
     */
    signature: string;
    /**
     * 需要使用的JS接口列表
     */
    jsApiList?: string[];
    /**
     * 开启调试模式,调用的所有api的返回值会在客户端alert出来，
     * 若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
     */
    debug?: boolean;
  }

  export interface ConfigError extends CommonResponse {}

  export function config (options: ConfigOptions): void;
  export function ready (callback: () => void): void;
  export function error (callback: (err: ConfigError) => void): void;

  export interface CheckJsApiResponse extends CommonResponse {
    checkResult: {
      [key in Method]?: true;
    }
  }
  export interface CheckJsApiOptions extends CommonOptions<CheckJsApiResponse> {
    jsApiList: Method[];
  }
  /**
   * 判断当前客户端版本是否支持指定JS接口
   */
  export function checkJsApi (options: CheckJsApiOptions): void;

  export interface UpdateAppMessageShareDataOptions extends CommonOptions {
    /** 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 */
    link: string;
    /** 分享标题 */
    title?: string;
    /** 分享描述 */
    desc?: string;
    /** 分享图标 */
    imgUrl?: string;
  }
  /** 自定义“分享给朋友”及“分享到QQ”按钮的分享内容 */
  export function updateAppMessageShareData (options: UpdateAppMessageShareDataOptions): void;

  export interface UpdateTimelineShareDataOptions extends CommonOptions {
    /** 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 */
    link: string;
    /** 分享标题 */
    title?: string;
    /** 分享图标 */
    imgUrl?: string;
  }
  /** 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容 */
  export function updateTimelineShareData (options: UpdateTimelineShareDataOptions): void;

  export interface StartRecordOptions extends CommonOptions {}
  export function startRecord (options?: StartRecordOptions): void;

  export interface StopRecordResponse extends CommonResponse {
    localId: string;
  }
  export interface StopRecordOptions extends CommonOptions<StopRecordResponse> {}
  export function stopRecord (options?: StopRecordOptions): void;

  export interface OnVoiceRecordEndResponse extends CommonResponse {
    localId: string;
  }
  export interface OnVoiceRecordEndOptions extends CommonOptions<OnVoiceRecordEndResponse> {}
  export function onVoiceRecordEnd (options?: OnVoiceRecordEndOptions): void;

  export interface PlayVoiceOptions extends CommonOptions {
    localId: string;
  }
  export function playVoice (options: PlayVoiceOptions): void;
  export interface PauseVoiceOptions extends CommonOptions {
    localId: string;
  }
  export function pauseVoice (options: PauseVoiceOptions): void;
  export interface StopVoiceOptions extends CommonOptions {
    localId: string;
  }
  export function stopVoice (options: StopVoiceOptions): void;
  export interface OnVoicePlayEndResponse extends CommonResponse {
    localId: string;
  }
  export interface OnVoicePlayEndOptions extends CommonOptions<OnVoicePlayEndResponse> {}
  export function onVoicePlayEnd (options?: OnVoicePlayEndOptions): void;

  export interface UploadVoiceResponse extends CommonResponse {
    serverId: string;
  }
  export interface UploadVoiceOptions extends CommonOptions<UploadVoiceResponse> {
    localId: string;
    isShowProgressTips?: number;
  }
  export function uploadVoice (options?: UploadVoiceOptions): void;

  export interface DownloadVoiceResponse extends CommonResponse {
    localId: string;
  }
  export interface DownloadVoiceOptions extends CommonOptions<DownloadVoiceResponse> {
    serverId: string;
    isShowProgressTips?: number;
  }
  export function downloadVoice (options?: DownloadVoiceOptions): void;

  export interface TranslateVoiceResponse extends CommonResponse {
    translateResult: string;
  }
  export interface TranslateVoiceOptions extends CommonOptions<TranslateVoiceResponse> {
    localId: string;
    isShowProgressTips?: number;
  }
  export function translateVoice (options?: TranslateVoiceOptions): void;

  export interface ChooseImageResponse extends CommonResponse {
    localIds: string[];
  }
  export interface ChooseImageOptions extends CommonOptions<ChooseImageResponse> {
    count: number;
    sizeType?: ('original' | 'compressed')[];
    sourceType?: ('album' | 'camera')[];
  }
  export function chooseImage (options?: ChooseImageOptions): void;

  export interface PreviewImageResponse extends CommonResponse {}
  export interface PreviewImageOptions extends CommonOptions<PreviewImageResponse> {
    current: string;
    urls: string[];
  }
  export function previewImage (options?: PreviewImageOptions): void;

  export interface UploadImageResponse extends CommonResponse {
    serverId: string;
  }
  export interface UploadImageOptions extends CommonOptions<UploadImageResponse> {
    localId: string;
    isShowProgressTips?: number;
  }
  export function uploadImage (options?: UploadImageOptions): void;
  
  export interface DownloadImageResponse extends CommonResponse {
    localId: string;
  }
  export interface DownloadImageOptions extends CommonOptions<DownloadImageResponse> {
    serverId: string;
    isShowProgressTips?: number;
  }
  export function downloadImage (options?: DownloadImageOptions): void;

  export interface GetLocalImgResponse extends CommonResponse {
    localData: string;
  }
  export interface GetLocalImgOptions extends CommonOptions<GetLocalImgResponse> {
    localId: string;
  }
  export function getLocalImgData (options?: GetLocalImgOptions): void;

  export interface GetNetworkTypeResponse extends CommonResponse {
    networkType: '2g' | '3g' | '4g' | '5g' | 'wifi';
  }
  export interface GetNetworkTypeOptions extends CommonOptions<GetNetworkTypeResponse> {}
  export function getNetworkType (options?: GetNetworkTypeOptions): void;
}

declare const jWeixin: typeof wx;

declare namespace WeixinJSBridge {
  export interface InvokeOptions {
    name?: string;
    arg?: { [key: string]: any };
    [key: string]: any;
  }

  export interface BridgeResponse {
    err_code?: any;
    err_desc?: any;
    err_detail?: any;
    errMsg?: string;
    err_msg?: string;
    [key: string]: any;
  }

  export function call (): never;
  export function invoke (message: string, options: InvokeOptions, callback: (res: BridgeResponse) => void): void;
  export function log (message: any): void;
  export function on (event: string, listener: (res: BridgeResponse) => void): void;
}
