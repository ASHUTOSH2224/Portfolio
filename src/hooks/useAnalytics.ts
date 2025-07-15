import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import analyticsService from '../services/analyticsService';

type EventType = 'click' | 'form_submit' | 'download' | 'email_click' | 'phone_click' | 'social_click' | 'project_view' | 'scroll' | 'video_play' | 'modal_open' | 'modal_close' | 'file_download' | 'external_link' | 'contact_form' | 'resume_download' | 'other';

export const useAnalytics = () => {
  const location = useLocation();
  const sessionId = analyticsService.getSessionId();

  const getUserAgent = () => navigator.userAgent || 'Unknown';
  const getIpAddress = () => '';

  // Track page view
  const trackPageView = useCallback(async () => {
    try {
      await analyticsService.trackPageView({
        sessionId,
        path: location.pathname,
        title: document.title || location.pathname,
        referrer: document.referrer || '',
        userAgent: getUserAgent(),
        ipAddress: getIpAddress()
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }, [location.pathname, sessionId]);

  // Track event
  const trackEvent = useCallback(async (
    type: EventType,
    element: string,
    value?: string,
    metadata?: Record<string, any>
  ) => {
    try {
      await analyticsService.trackEvent({
        sessionId,
        type,
        element,
        value,
        metadata,
        userAgent: getUserAgent(),
        ipAddress: getIpAddress()
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }, [sessionId]);

  // Track conversion
  const trackConversion = useCallback(async (
    type: 'contact_form' | 'resume_download' | 'email_click' | 'phone_click' | 'social_follow' | 'project_inquiry' | 'calendly_booking' | 'other',
    value?: string,
    metadata?: Record<string, any>
  ) => {
    try {
      await analyticsService.trackConversion({
        sessionId,
        type,
        value,
        metadata,
        userAgent: getUserAgent(),
        ipAddress: getIpAddress()
      });
    } catch (error) {
      console.error('Failed to track conversion:', error);
    }
  }, [sessionId]);

  // Initialize analytics on mount
  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  return { trackEvent, trackConversion };
}; 