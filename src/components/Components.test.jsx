import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LanguageProvider } from '../context/LanguageContext';
import DownLoadButton from './DownloadButton';
import GithubButton from './GithubButton';
import CloseModalButton from './CloseModalButton';

import AdminInterface from '../PagesProjects/AdminInterface';
import Cartography from '../PagesProjects/Cartography';
import EasyWorkEnv from '../PagesProjects/EasyWorkEnv';
import GmailAISort from '../PagesProjects/GmailAISort';
import InstaGramClone from '../PagesProjects/InstaGramClone';
import Phantom from '../PagesProjects/Phantom';
import PlaformerGame from '../PagesProjects/PlaformerGame';
import Ransomware from '../PagesProjects/Ransomware';
import SportApplication from '../PagesProjects/SportApplication';
import SyncCRD2CRM from '../PagesProjects/SyncCRD2CRM';

describe('Milestone 1 Structural & Layout correctness tests', () => {
  test('DownloadButton renders as a div, not a button', () => {
    const { container } = render(
      <LanguageProvider>
        <DownLoadButton />
      </LanguageProvider>
    );
    // Find the container element with class "button"
    const buttonDiv = container.querySelector('.button');
    expect(buttonDiv).toBeInTheDocument();
    expect(buttonDiv.tagName.toLowerCase()).toBe('div');
    expect(buttonDiv.tagName.toLowerCase()).not.toBe('button');
  });

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

  test('CloseModalButton exposes onClick and ariaLabel props', () => {
    const handleClick = jest.fn();
    const testAriaLabel = 'Test Close';
    
    render(
      <CloseModalButton onClick={handleClick} ariaLabel={testAriaLabel} />
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', testAriaLabel);
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  const projectPages = [
    { name: 'AdminInterface', Component: AdminInterface },
    { name: 'Cartography', Component: Cartography },
    { name: 'EasyWorkEnv', Component: EasyWorkEnv },
    { name: 'GmailAISort', Component: GmailAISort },
    { name: 'InstaGramClone', Component: InstaGramClone },
    { name: 'Phantom', Component: Phantom },
    { name: 'PlaformerGame', Component: PlaformerGame },
    { name: 'Ransomware', Component: Ransomware },
    { name: 'SportApplication', Component: SportApplication },
    { name: 'SyncCRD2CRM', Component: SyncCRD2CRM },
  ];

  projectPages.forEach(({ name, Component }) => {
    test(`Project page ${name} renders exactly one h1 element for the title`, () => {
      const { container } = render(
        <LanguageProvider>
          <Component />
        </LanguageProvider>
      );
      const h1Elements = container.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
      expect(h1Elements[0]).toHaveClass('project-title');
    });
  });
});

