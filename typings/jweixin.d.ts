/// <reference path="bridge.d.ts" />

declare namespace wx {
  export type Method =
    'checkJsApi' |
    'updateAppMessageShareData' |
    'updateTimelineShareData' |
    'onMenuShareTimeline' |
    'onMenuShareAppMessage' |
    'onMenuShareQQ' |
    'onMenuShareWeibo' |
    'onMenuShareQZone' |
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
    'startSearchBeacons' |
    'stopSearchBeacons' |
    'onSearchBeacons' |
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
    'openBusinessView' |
    // 'openEnterpriseChat' |
    'addCard' |
    'chooseCard' |
    'openCard';
  
  export type OpenTag = 
    'wx-open-launch-weapp' |
    'wx-open-launch-app' |
    'wx-open-subscribe' |
    'wx-open-audio';
  
  export type MenuItem =
    'menuItem:exposeArticle' |
    'menuItem:setFont' |
    'menuItem:dayMode' |
    'menuItem:nightMode' |
    'menuItem:refresh' |
    'menuItem:profile' |
    'menuItem:addContact' |
  
    'menuItem:share:appMessage' |
    'menuItem:share:timeline' |
    'menuItem:share:qq' |
    'menuItem:share:weiboApp' |
    'menuItem:favorite' |
    'menuItem:share:facebook' |
    'menuItem:share:QZone' |
  
    'menuItem:editTag' |
    'menuItem:delete' |
    'menuItem:copyUrl' |
    'menuItem:originPage' |
    'menuItem:readMode' |
    'menuItem:openWithQQBrowser' |
    'menuItem:openWithSafari' |
    'menuItem:share:email' |
    'menuItem:share:brand';

  interface CommonResponse {
    errMsg: string;
    [k: string]: any;
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
    jsApiList?: Method[];
    /**
     * 开启调试模式,调用的所有api的返回值会在客户端alert出来，
     * 若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
     */
    debug?: boolean;
    /**
     * 需要使用的开放标签列表
     */
    openTagList?: OpenTag[];
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

  export interface OnMenuShareTimelineOptions extends CommonOptions {
    link?: string;
    title?: string;
    imgUrl?: string;
    type?: 'link' | 'music' | 'video';
    dataUrl?: string;
  }
  export function onMenuShareTimeline (options: OnMenuShareTimelineOptions): void;

  export interface OnMenuShareAppMessageOptions extends CommonOptions {
    link?: string;
    title?: string;
    desc?: string;
    imgUrl?: string;
    type?: 'link' | 'music' | 'video';
    dataUrl?: string;
  }
  export function onMenuShareAppMessage (options: OnMenuShareAppMessageOptions): void;

  export interface OnMenuShareQQOptions extends CommonOptions {
    link?: string;
    title?: string;
    desc?: string;
    imgUrl?: string;
  }
  export function onMenuShareQQ (options: OnMenuShareQQOptions): void;

  export interface OnMenuShareWeiboOptions extends CommonOptions {
    link?: string;
    title?: string;
    desc?: string;
    imgUrl?: string;
  }
  export function onMenuShareWeibo (options: OnMenuShareWeiboOptions): void;

  export interface OnMenuShareQZoneOptions extends CommonOptions {
    link?: string;
    title?: string;
    desc?: string;
    imgUrl?: string;
  }
  export function onMenuShareQZone (options: OnMenuShareQZoneOptions): void;

  export interface StartRecordOptions extends CommonOptions {}
  export function startRecord (options?: StartRecordOptions): void;

  export interface StopRecordResponse extends CommonResponse {
    localId: string;
  }
  export interface StopRecordOptions extends CommonOptions<StopRecordResponse> {}
  export function stopRecord (options: StopRecordOptions): void;

  export interface OnVoiceRecordEndResponse extends CommonResponse {
    localId: string;
  }
  export interface OnVoiceRecordEndOptions extends CommonOptions<OnVoiceRecordEndResponse> {}
  export function onVoiceRecordEnd (options: OnVoiceRecordEndOptions): void;

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
  export function onVoicePlayEnd (options: OnVoicePlayEndOptions): void;

  export interface UploadVoiceResponse extends CommonResponse {
    serverId: string;
  }
  export interface UploadVoiceOptions extends CommonOptions<UploadVoiceResponse> {
    localId: string;
    isShowProgressTips?: number;
  }
  export function uploadVoice (options: UploadVoiceOptions): void;

  export interface DownloadVoiceResponse extends CommonResponse {
    localId: string;
  }
  export interface DownloadVoiceOptions extends CommonOptions<DownloadVoiceResponse> {
    serverId: string;
    isShowProgressTips?: number;
  }
  export function downloadVoice (options: DownloadVoiceOptions): void;

  export interface TranslateVoiceResponse extends CommonResponse {
    translateResult: string;
  }
  export interface TranslateVoiceOptions extends CommonOptions<TranslateVoiceResponse> {
    localId: string;
    isShowProgressTips?: number;
  }
  export function translateVoice (options: TranslateVoiceOptions): void;

  export interface ChooseImageResponse extends CommonResponse {
    localIds: string[];
  }
  export interface ChooseImageOptions extends CommonOptions<ChooseImageResponse> {
    count: number;
    sizeType?: ('original' | 'compressed')[];
    sourceType?: ('album' | 'camera')[];
  }
  export function chooseImage (options: ChooseImageOptions): void;

  export interface PreviewImageResponse extends CommonResponse {}
  export interface PreviewImageOptions extends CommonOptions<PreviewImageResponse> {
    current: string;
    urls: string[];
  }
  export function previewImage (options: PreviewImageOptions): void;

  export interface UploadImageResponse extends CommonResponse {
    serverId: string;
  }
  export interface UploadImageOptions extends CommonOptions<UploadImageResponse> {
    localId: string;
    isShowProgressTips?: number;
  }
  export function uploadImage (options: UploadImageOptions): void;
  
  export interface DownloadImageResponse extends CommonResponse {
    localId: string;
  }
  export interface DownloadImageOptions extends CommonOptions<DownloadImageResponse> {
    serverId: string;
    isShowProgressTips?: number;
  }
  export function downloadImage (options: DownloadImageOptions): void;

  export interface GetLocalImgResponse extends CommonResponse {
    localData: string;
  }
  export interface GetLocalImgOptions extends CommonOptions<GetLocalImgResponse> {
    localId: string;
  }
  export function getLocalImgData (options: GetLocalImgOptions): void;

  export interface GetNetworkTypeResponse extends CommonResponse {
    networkType: '2g' | '3g' | '4g' | '5g' | 'wifi';
  }
  export interface GetNetworkTypeOptions extends CommonOptions<GetNetworkTypeResponse> {}
  export function getNetworkType (options: GetNetworkTypeOptions): void;

  export interface OpenLocationResponse extends CommonResponse {}
  export interface OpenLocationOptions extends CommonOptions<OpenLocationResponse> {
    /** 纬度，浮点数，范围为90 ~ -90 */
    latitude: number;
    /** 经度，浮点数，范围为180 ~ -180 */
    longitude: number;
    /** 位置名 */
    name?: string;
    /** 地址详情说明 */
    address?: string;
    /** 地图缩放级别,整形值,范围从1~28。默认为最大 */
    scale?: number;
    /** 在查看位置界面底部显示的超链接,可点击跳转 */
    infoUrl?: string;
  }
  export function openLocation (options: OpenLocationOptions): void;

  export interface GetLocationResponse extends CommonResponse {
    latitude: number;
    longitude: number;
    speed?: number;
    accuracy?: number;
  }
  export interface GetLocationOptions extends CommonOptions<GetLocationResponse> {
    /** 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02' */
    type?: 'wgs84' | 'gcj02';
  }
  export function getLocation (options?: GetLocationOptions): void;

  export interface StartSearchBeaconsResponse extends CommonResponse {}
  export interface StartSearchBeaconsOptions extends CommonOptions<StartSearchBeaconsResponse> {
    /** 摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面 */
    ticket?: string;
  }
  export function startSearchBeacons (options: StartSearchBeaconsOptions): void;

  export interface StopSearchBeaconsResponse extends CommonResponse {}
  export interface StopSearchBeaconsOptions extends CommonOptions<StopSearchBeaconsResponse> {}
  export function stopSearchBeacons (options: StopSearchBeaconsOptions): void;

  export interface OnSearchBeaconsResponse extends CommonResponse {}
  export interface OnSearchBeaconsOptions extends CommonOptions<OnSearchBeaconsResponse> {}
  export function onSearchBeacons (options: OnSearchBeaconsOptions): void;

  export interface CloseWindowResponse extends CommonResponse {}
  export interface CloseWindowOptions extends CommonOptions<CloseWindowResponse> {}
  export function closeWindow (options?: CloseWindowOptions): void;

  export interface HideMenuItemsResponse extends CommonResponse {}
  export interface HideMenuItemsOptions extends CommonOptions<HideMenuItemsResponse> {
    menuList: MenuItem[];
  }
  export function hideMenuItems (options: HideMenuItemsOptions): void;

  export interface ShowMenuItemsResponse extends CommonResponse {}
  export interface ShowMenuItemsOptions extends CommonOptions<ShowMenuItemsResponse> {
    menuList: MenuItem[];
  }
  export function showMenuItems (options: ShowMenuItemsOptions): void;

  export function hideAllNonBaseMenuItem (options?: CommonOptions): void;
  export function showAllNonBaseMenuItem (options?: CommonOptions): void;
  export function hideOptionMenu (options?: CommonOptions): void;
  export function showOptionMenu (options?: CommonOptions): void;

  export interface ScamQRCodeResponse extends CommonResponse {
    resultStr?: string;
  }
  export interface ScamQRCodeOptions extends CommonOptions<ScamQRCodeResponse> {
    needResult?: number;
    scanType?: ('qrCode' | 'barCode')[];
  }
  export function scanQRCode (options?: ScamQRCodeOptions): void;

  export interface OpenProductSpecificViewResponse extends CommonResponse {}
  export interface OpenProductSpecificViewOptions extends CommonOptions<OpenProductSpecificViewResponse> {
    productId: string;
    viewType?: 0 | 1 | 2;
    extInfo?: string;
  }
  export function openProductSpecificView (options: OpenProductSpecificViewOptions): void;

  export interface ChooseCardResponse extends CommonResponse {
    cardList: any[];
  }
  export interface ChooseCardOptions extends CommonOptions<ChooseCardResponse> {
    shopId?: string;
    cardType?: string;
    cardId?: string;
    timestamp: number;
    nonceStr: string;
    signType: 'SHA1';
    cardSign: string;
  }
  export function chooseCard (options: ChooseCardOptions): void;

  export interface CardAdd {
    cardId: string;
    cardExt: string;
  }
  export interface AddCardResponse extends CommonResponse {
    cardList: any[];
  }
  export interface AddCardOptions extends CommonOptions<AddCardResponse> {
    cardList: CardAdd[];
  }
  export function addCard (options: AddCardOptions): void;

  export interface CardOpen {
    cardId: string;
    code: string;
  }
  export interface OpenCardResponse extends CommonResponse {}
  export interface OpenCardOptions extends CommonOptions<OpenCardResponse> {
    cardList: CardOpen[];
  }
  export function openCard (options: OpenCardOptions): void;

  export interface ChooseWXPayResponse extends CommonResponse {}
  export interface ChooseWXPayOptions extends CommonOptions<ChooseWXPayResponse> {
    timestamp: number;
    nonceStr: string;
    package: string;
    signType: 'SHA1' | 'MD5';
    paySign: string;
  }
  export function chooseWXPay (options: ChooseWXPayOptions): void;
  export function openEnterpriseRedPacket (options: ChooseWXPayOptions): void;

  export interface OpenAddressResponse extends CommonResponse {
    userName: string;
    postalCode: string;
    provinceName: string;
    cityName: string
    countryName: string;
    detailInfo: string;
    nationalCode: string;
    telNumber: string;
  }
  export interface OpenAddressOptions extends CommonOptions<OpenAddressResponse> {}
  export function openAddress (options: OpenAddressOptions): void;

  export interface ConsumeAndShareCardResponse extends CommonResponse {}
  export interface ConsumeAndShareCardOptions extends CommonOptions<ConsumeAndShareCardResponse> {
    cardId: string;
    code: string;
  }
  export function consumeAndShareCard (options: ConsumeAndShareCardOptions): void;

  export interface LaunchMiniProgramResponse extends CommonResponse {}
  export interface LaunchMiniProgramOptions extends CommonOptions<LaunchMiniProgramResponse> {
    targetAppId: string;
    path: string;
    envVersion: string;
  }
  export function launchMiniProgram (options: LaunchMiniProgramOptions): void;

  export interface OpenBusinessViewResponse extends CommonResponse {}
  export interface OpenBusinessViewOptions extends CommonOptions<OpenBusinessViewResponse> {
    businessType: string;
    envVersion?: string;
    queryString?: string;
    extraData?: any;
  }
  export function openBusinessView (options: OpenBusinessViewOptions): void;

  export interface OpenEnterpriseChatResponse extends CommonResponse {}
  export interface OpenEnterpriseChatOptions extends CommonOptions<OpenEnterpriseChatResponse> {
    userIds: string[];
    groupName: string;
  }
  export function openEnterpriseChat (options: OpenEnterpriseChatOptions): void;

  export function invoke (message?: string, options?: WXInvokeOptions, callback?: (res: WXBridgeResponse) => void): void;
  export function on (event?: string, listener?: (res: WXBridgeResponse) => void): void;

  export namespace miniProgram {
    export interface NavigateBackResponse extends CommonResponse {}
    export interface NavigateBackOptions extends CommonOptions<NavigateBackResponse> {
      delta?: number;
    }
    export function navigateBack (options?: NavigateBackOptions): void;

    export interface NavigateToResponse extends CommonResponse {}
    export interface NavigateToOptions extends CommonOptions<NavigateToResponse> {
      url: string;
    }
    export function navigateTo (options: NavigateToOptions): void;

    export interface RedirectToResponse extends CommonResponse {}
    export interface RedirectToOptions extends CommonOptions<RedirectToResponse> {
      url: string;
    }
    export function redirectTo (options: RedirectToOptions): void;

    export interface SwitchTabResponse extends CommonResponse {}
    export interface SwitchTabOptions extends CommonOptions<SwitchTabResponse> {
      url: string;
    }
    export function switchTab (options: SwitchTabOptions): void;

    export interface ReLaunchResponse extends CommonResponse {}
    export interface ReLaunchOptions extends CommonOptions<ReLaunchResponse> {
      url: string;
    }
    export function reLaunch (options: ReLaunchOptions): void;

    export interface postMessageResponse extends CommonResponse {}
    export interface postMessageOptions extends CommonOptions<postMessageResponse> {
      data?: any;
    }
    export function postMessage (options: postMessageOptions): void;

    export interface postMessageResponse extends CommonResponse {}
    export interface postMessageOptions extends CommonOptions<postMessageResponse> {
      data?: any;
    }

    export interface GetEnvResponse {
      miniprogram: boolean
    }
    export function getEnv (callback: (res: GetEnvResponse) => void): void;
  }
}

declare const jWeixin: typeof wx;
