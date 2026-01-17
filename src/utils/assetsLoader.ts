import imagesLoaded from "imagesloaded";

interface IAssets {
  images: string[];
  videos: string[];
}

// Preload all the images and videos
const preloadImagesAndVideos = (assets: IAssets): Promise<void> => {
  return new Promise((resolve, reject) => {
    const container = document.createElement("div");

    assets.images.forEach((src) => {
      const element = document.createElement("img");
      element.src = src;
      container.appendChild(element);
    });

    assets.videos.forEach((src) => {
      const element = document.createElement("video");
      element.src = src;
      element.preload = "auto";
      container.appendChild(element);
    });

    imagesLoaded(container, { background: true }, (instance) => {
      if (instance.isComplete) {
        container.remove();
        resolve();
      } else {
        reject(new Error("Unable to load all the assets"));
      }
    });
  });
};

//Preload  Assets
export const preloadAssets = async (): Promise<void> => {
  const assets: IAssets = {
    images: [
      "/img/1.png",
      "/img/2.png",
      "/img/3.png",
      "/img/4.png",
      "/img/5.png",
      "/img/6.png",
      "/img/7.png",
      "/img/8.png",
      "/img/9.png",
      "/img/10.png",
      "/img/11.png",
      "/img/12.png",
      "/img/profile.webp",
    ],
    videos: [],
  };
  await preloadImagesAndVideos(assets);
};
