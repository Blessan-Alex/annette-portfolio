import React from 'react';

export interface ContentItem {
  id: string;
  title: string;
  subtext: string;
  date: string;
  tabName: 'Articles' | 'Journals' | 'Doodles';
  category?: string;
  thumbnail?: string;
  renderContent?: () => React.ReactNode;
}
