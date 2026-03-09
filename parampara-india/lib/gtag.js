// Google Analytics utility functions for easy tracking

// Track button clicks
export const trackButtonClick = (buttonName, buttonText, location, additionalParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'button_click', {
      button_name: buttonName,
      button_text: buttonText,
      click_location: location,
      ...additionalParams
    });
  }
};

// Track CTA clicks
export const trackCTAClick = (ctaType, destination, context = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      cta_type: ctaType,
      destination: destination,
      ...context
    });
  }
};

// Track WhatsApp clicks
export const trackWhatsappClick = (phoneNumber, message, context = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      phone_number: phoneNumber,
      message: message,
      ...context
    });
  }
};

// Track social media clicks
export const trackSocialClick = (platform, action = 'follow', context = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'social_engagement', {
      social_platform: platform,
      social_action: action,
      ...context
    });
  }
};

// Track product views
export const trackProductView = (product, listName = 'Product List') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      ecommerce: {
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_category: product.category?.[0] || 'Stove',
          price: product.price || 0,
          quantity: 1
        }]
      },
      item_list_name: listName
    });
  }
};

// Track product clicks
export const trackProductClick = (product, listName = 'Product List', index = 0) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'select_item', {
      ecommerce: {
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_category: product.category?.[0] || 'Stove',
          price: product.price || 0,
          quantity: 1,
          index: index
        }]
      },
      item_list_name: listName
    });
  }
};

// Track form submissions
export const trackFormSubmit = (formName, formData = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      form_name: formName,
      ...formData
    });
  }
};

// Track scroll events
export const trackScrollDepth = (depth, pageSection = '') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_event', {
      scroll_depth: depth,
      page_section: pageSection
    });
  }
};

// Custom event tracking
export const trackCustom = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};
