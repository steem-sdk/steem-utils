/**
 * @ignore
*/
export const rendererDefaults = (config = {}) => {
  if (!config.imageProxyFn) config.imageProxyFn = (url) => url
  if (!config.usertagUrlFn) config.usertagUrlFn = (account) => "/@" + account
  if (!config.hashtagUrlFn) config.hashtagUrlFn = (hashtag) => "/issue/" + hashtag
  if (!config.isLinkSafeFn) config.isLinkSafeFn = (url) => true

  return {
    baseUrl: config.baseUrl || "https://steem.online/",
    breaks: config.breaks || true,
    skipSanitization: config.skipSanitization || false,
    allowInsecureScriptTags: config.allowInsecureScriptTags || false,
    addNofollowToLinks: config.addNofollowToLinks || true,
    doNotShowImages: config.doNotShowImages || false,
    ipfsPrefix: config.ipfsPrefix || "",
    assetsWidth: config.assetsWidth || 640,
    assetsHeight: config.assetsHeight || 480,
    imageProxyFn: config.imageProxyFn,
    usertagUrlFn: config.usertagUrlFn,
    hashtagUrlFn: config.hashtagUrlFn,
    isLinkSafeFn: config.isLinkSafeFn
  }
}

/**
 * @ignore
*/
export const voterCount = 10
