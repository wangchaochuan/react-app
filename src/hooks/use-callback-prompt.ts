/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useBlocker from '@/hooks/use-blocker';

function useCallbackPrompt(when: boolean): [boolean, () => void, () => void] {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPrompt, setShowPrompt] = useState(false);
  const [lastLocation, setLastLocation] = useState<any>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
  }, []);

  // handle blocking when user click on another route prompt will be shown
  const handleBlockedNavigation = useCallback(
    (nextLocation: any) => {
      // in if condition we are checking next location and current location are equals or not
      if (!confirmedNavigation && nextLocation.location.pathname !== location.pathname) {
        setShowPrompt(true);
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    [confirmedNavigation]
  );

  const confirmNavigation = useCallback(() => {
    setShowPrompt(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      let path = lastLocation.location.pathname;
      if (window.__POWERED_BY_QIANKUN__) {
        const type = 'business-build/event';
        if (path.includes(type)) {
          const regx = new RegExp('/.*?/' + type);
          const name = path.match(regx)?.[0];
          path = path.replace(name, '');
          navigate(path);
        }
        return;
      }
      navigate(path);
    }
  }, [navigate, confirmedNavigation, lastLocation]);

  useBlocker(handleBlockedNavigation, when);

  return [showPrompt, confirmNavigation, cancelNavigation];
}

export default useCallbackPrompt;
