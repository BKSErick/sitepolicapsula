import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { company, navigation } from '../data/site-content';
import { BrandMark } from './BrandMark';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__brand" href="/" aria-label="Policápsula, início">
          <BrandMark inverted />
          <span>{company.signature.toUpperCase()}</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          id="main-navigation"
          className={`main-navigation ${isOpen ? 'main-navigation--open' : ''}`}
          aria-label="Principal"
        >
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="header-cta" href="/contato/">
            Solicitar análise
          </a>
        </nav>
      </div>
    </header>
  );
}
