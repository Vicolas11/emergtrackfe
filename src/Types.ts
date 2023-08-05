export interface Item {
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
    publishedAt: Date;
    channelTitle: string;
    channelId: string;
  };
  contentDetails: { upload: { videoId: string } };
}
