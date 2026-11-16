import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import GithubButton from './GithubButton';

import Cartography from '../PagesProjects/Cartography';
import EasyWorkEnv from '../PagesProjects/EasyWorkEnv';
import GmailAISort from '../PagesProjects/GmailAISort';
import Phantom from '../PagesProjects/Phantom';
import SyncCRD2CRM from '../PagesProjects/SyncCRD2CRM';
import CleanFeed from '../PagesProjects/CleanFeed';

describe('Milestone 1 Structural & Layout correctness tests', () => {
  test('GithubButton renders as a span, not a button', () => {
    const { container } = render(
      <LanguageProvider>
        <GithubButton />
      </LanguageProvider>
    );
    const githubSpan = container.querySelector('.github-button');
    expect(githubSpan).toBeInTheDocument();
    expect(githubSpan.tagName.toLowerCase()).toBe('span');
    expect(githubSpan.tagName.toLowerCase()).not.toBe('button');
  });

  const projectPages = [
    { name: 'Cartography', Component: Cartography },
    { name: 'EasyWorkEnv', Component: EasyWorkEnv },
    { name: 'GmailAISort', Component: GmailAISort },
    { name: 'Phantom', Component: Phantom },
    { name: 'SyncCRD2CRM', Component: SyncCRD2CRM },
    { name: 'CleanFeed', Component: CleanFeed },
  ];

  projectPages.forEach(({ name, Component }) => {
    test(`Project page ${name} renders exactly one h1 element for the title`, () => {
      const { container } = render(
        <MemoryRouter>
          <LanguageProvider>
            <Component />
          </LanguageProvider>
        </MemoryRouter>
      );
      const h1Elements = container.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
      expect(h1Elements[0]).toHaveClass('project-title');
    });
  });
});

