import Router, { type NextRouter } from "next/router";
import { useEffect } from "react";
import { LocalStorage } from "./utils/storage";

type PageUrl = string;
type ScrollPosition = { x: number, y: number; };
type PagesScrollPosition = Record<PageUrl, ScrollPosition>;
const _pagesScrollPosition = {
  getStorage: () => new LocalStorage<PagesScrollPosition>('app-shell-pagesScrollPosition'),
  getDomNode: () => window.document.getElementsByClassName('AppShell__content')[0],
  persistScrollPositionSnapshot: (url: PageUrl) => {
    const node = _pagesScrollPosition.getDomNode();
    if (!node) return;
    const storage = _pagesScrollPosition.getStorage();
    const scrollPosition: ScrollPosition = {
      x: node.scrollLeft,
      y: node.scrollTop,
    };
    storage.save({
      ...storage.retrieve() ?? {},
      [url]: scrollPosition,
    });
  },
  restoreScrollPositionSnapshot: (url: PageUrl) => {
    const storage = _pagesScrollPosition.getStorage();
    const pagesScrollPosition = storage.retrieve();
    if (!pagesScrollPosition) return;
    if (!pagesScrollPosition[url]) return;
    const node = _pagesScrollPosition.getDomNode();
    if (!node) return;
    const { x, y } = pagesScrollPosition[url];
    setTimeout(() => {
      node.scrollTo({ left: x, top: y, behavior: 'auto' });
    }, 50);
  },
  scrollToTop: () => {
    const node = _pagesScrollPosition.getDomNode();
    if (!node) return;
    setTimeout(() => {
      node.scrollTo({ left: 0, top: 0, behavior: 'auto' });
    }, 50);
  }
};

type LastNavigationEvent = { type: 'BACK_OR_FORWARD' | 'REGULAR_NAVIGATION'; };
const _lastNavigationEvent = {
  getStorage: () => new LocalStorage<LastNavigationEvent>('app-shell-lastNavigationEvent'),
  saveEventType: (type: LastNavigationEvent['type']) => {
    const storage = _lastNavigationEvent.getStorage();
    storage.save({ type });
  },
  getLastEvent: (): LastNavigationEvent => {
    const storage = _lastNavigationEvent.getStorage();
    return storage.retrieve() ?? { type: 'REGULAR_NAVIGATION' };
  },
  forget: () => {
    const storage = _lastNavigationEvent.getStorage();
    storage.delete();
  }
};

export const useScrollRestoration = () => {
  useEffect(() => {
    type NextEventHandler = Parameters<NextRouter['events']['on']>[1];

    // Router.events.on handlers
    const beforeHistoryChange: NextEventHandler = (newUrl, options) => {
    };
    const hashChangeComplete: NextEventHandler = (newUrl, options) => {
    };
    const hashChangeStart: NextEventHandler = (newUrl, options) => {
    };
    const routeChangeComplete: NextEventHandler = (newUrl, options) => {
      // Note:
      // this handler is invoked AFTER transitioning to new page/route, 
      if (_lastNavigationEvent.getLastEvent()?.type === 'BACK_OR_FORWARD') {
        _pagesScrollPosition.restoreScrollPositionSnapshot(newUrl);
      }
      if (_lastNavigationEvent.getLastEvent()?.type === 'REGULAR_NAVIGATION') {
        _pagesScrollPosition.scrollToTop();
      }
      _lastNavigationEvent.forget();
    };
    const routeChangeError: NextEventHandler = (newUrl, options) => {
    };
    const routeChangeStart: NextEventHandler = (newUrl, options) => {
      // Note:
      // this handler is invoked BEFORE transitioning to new page/route, 
      // (<Link> click or router.push() ) start the transition

      const oldUrl = Router.asPath;
      _pagesScrollPosition.persistScrollPositionSnapshot(oldUrl);
    };

    // Router.beforePopState
    const beforePopState: Parameters<NextRouter['beforePopState']>[0] = (state) => {
      // Note:
      // this handler is invoked BEFORE transitioning to new page/route 
      // but only when going "back" (or "forward") in history, usually via browser buttons
      // <Link> click or router.push() DOES NOT invoke this handler

      _lastNavigationEvent.saveEventType('BACK_OR_FORWARD');
      return true;
    };

    // Window.on('beforeunload')
    const onWindowBeforeUnload = (event: BeforeUnloadEvent) => {
      // Note:
      // This handler is invoked when the browser tab is going to be deactivated and closed
      const oldUrl = Router.asPath;
      _pagesScrollPosition.persistScrollPositionSnapshot(oldUrl);
      delete event['returnValue'];
    };

    Router.events.on('beforeHistoryChange', beforeHistoryChange);
    Router.events.on('hashChangeComplete', hashChangeComplete);
    Router.events.on('hashChangeStart', hashChangeStart);
    Router.events.on('routeChangeComplete', routeChangeComplete);
    Router.events.on('routeChangeError', routeChangeError);
    Router.events.on('routeChangeStart', routeChangeStart);
    Router.beforePopState(beforePopState);
    window.addEventListener('beforeunload', onWindowBeforeUnload);
    return () => {
      Router.events.off('beforeHistoryChange', beforeHistoryChange);
      Router.events.off('hashChangeComplete', hashChangeComplete);
      Router.events.off('hashChangeStart', hashChangeStart);
      Router.events.off('routeChangeComplete', routeChangeComplete);
      Router.events.off('routeChangeError', routeChangeError);
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.beforePopState(() => true);
      window.removeEventListener('beforeunload', onWindowBeforeUnload);
    };
  }, []);
};