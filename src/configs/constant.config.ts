export const constant = {
  port: +(process.env.PORT as unknown as number) || 3000,
  devURL: process.env.REACT_APP_DEV_APP_URL as string,
  liveURL: process.env.REACT_APP_LIVE_APP_URL as string,
  FLWPUBKTest: process.env.REACT_APP_FLWPUBKTEST as string,
  uploadLogo: process.env.REACT_APP_UPLOAD_LOGO as string,
  defaultImg: process.env.REACT_APP_DEFAULT_IMG as string,
  openCageAPI: process.env.REACT_APP_OPENCAGEAPI as string,
  appURL: process.env.REACT_APP_APP_URL as string,
  cloudName: process.env.REACT_APP_CLOUDNAME as string,
  apiKey: process.env.REACT_APP_APIKEY as string,
  apiSecret: process.env.REACT_APP_APISECRET as string,
  cloudEndPoint: process.env.REACT_APP_CLOUDINARY_ENDPOINT as string,
};
