/**
 * Gate between the preloader and page intros: intros wait for `whenIntroReady()`,
 * which resolves immediately when no preloader runs.
 */
let release: () => void = () => {};
let ready: Promise<void> = Promise.resolve();

export function resetIntro(): void {
  ready = new Promise<void>((resolve) => {
    release = resolve;
  });
}

export function releaseIntro(): void {
  release();
}

export function whenIntroReady(): Promise<void> {
  return ready;
}
