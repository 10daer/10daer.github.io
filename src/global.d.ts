// global.d.ts or types.d.ts

declare module "imagesloaded" {
  interface ImagesLoaded {
    (
      element: HTMLElement | NodeList | string,
      options?: { background: boolean },
      callback?: (instance: ImagesLoadedInstance) => void
    ): ImagesLoadedInstance;
  }

  interface ImagesLoadedInstance {
    isComplete: boolean;
    images: any[];
    on(event: string, listener: (...args: any[]) => void): void;
  }

  const imagesLoaded: ImagesLoaded;
  export default imagesLoaded;
}

declare module "webfontloader" {
  interface WebFontConfig {
    google?: {
      families: string[];
    };
    custom?: {
      families?: string[];
      urls?: string[];
    };
    timeout?: number;
    active?: () => void;
    inactive?: () => void;
  }

  const WebFont: {
    load(config: WebFontConfig): void;
  };

  export default WebFont;
}
