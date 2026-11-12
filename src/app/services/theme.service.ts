
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly storageKey = 'velora-theme';

  private currentTheme: Theme = 'light';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }
  }

  private initializeTheme(): void {

    const savedTheme = localStorage.getItem(
      this.storageKey
    );

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    const theme: Theme =
      savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : prefersDark ? 'dark' : 'light';

    this.setTheme(theme);
  }

  setTheme(theme: Theme): void {

    this.currentTheme = theme;

    const html = this.document.documentElement;

    html.classList.toggle(
      'dark-theme',
      theme === 'dark'
    );

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        this.storageKey,
        theme
      );
    }
  }

  toggleTheme(): void {

    const nextTheme: Theme =
      this.currentTheme === 'dark'
        ? 'light'
        : 'dark';

    this.setTheme(nextTheme);
  }

  isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }

}
