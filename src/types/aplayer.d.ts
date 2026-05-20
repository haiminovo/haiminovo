declare module 'aplayer' {
  interface APlayerOptions {
    container: HTMLElement;
    fixed?: boolean;
    mini?: boolean;
    autoplay?: boolean;
    theme?: string;
    audio: APlayerAudio[];
  }

  interface APlayerAudio {
    name: string;
    artist: string;
    url: string;
    cover?: string;
    lrc?: string;
    theme?: string;
  }

  interface APlayerInstance {
    destroy(): void;
  }

  class APlayer {
    constructor(options: APlayerOptions);
    destroy(): void;
  }

  export default APlayer;
}
