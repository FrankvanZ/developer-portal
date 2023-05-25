// Global
import { MDXRemote } from 'next-mdx-remote';
import { useEffect, useState } from 'react';
//import { LightAsync as SyntaxHighlight } from 'react-syntax-highlighter';
import { a11yDark, a11yLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
// Interfaces
import type { PartialData } from '@/src/interfaces/page-info';
// Lib
import EditButton from 'ui/components/buttons/EditButton';
import { Article } from 'ui/components/cards/Article';
import CTACard from 'ui/components/cards/CTACard';
import { LinkItem } from 'ui/components/cards/LinkItem';
import { Promo } from 'ui/components/cards/PromoCard';
import { Repository } from 'ui/components/cards/Repository';
import { Row } from 'ui/components/common/Row';
import VerticalGroup from 'ui/components/common/VerticalGroup';
import VideoPromo from 'ui/components/video/videoPromo';
import YouTube from 'ui/components/video/YouTube';

import { Light as SyntaxHighlight } from 'react-syntax-highlighter';

type MarkdownContentProps = {
  partials: PartialData;
  hasGrid?: boolean;
};

type DecoratedMarkdownProps = {
  children: string;
};

export const DecoratedMarkdown = ({ children }: DecoratedMarkdownProps): JSX.Element => {
  const [isDark, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  return (
    <MDXRemote
      scope={''}
      frontmatter={undefined}
      compiledSource={children}
      components={{
        code({ className, children }) {
          const match = /language-(\w+)/.exec(className || '');
          const lang = match ? match[1] : '';
          const style = isDark ? a11yDark : a11yLight;
          return match ? (
            <div className="not-prose">
              <SyntaxHighlight style={style} language={lang} PreTag="div">
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlight>
            </div>
          ) : (
            <code className={className}>{children}</code>
          );
        },
        a({ href, children, ...rest }) {
          if (children?.toString().toLowerCase() == 'get latest' || children?.toString().toLowerCase() == 'see all versions') {
            return (
              <a className="btn-primary" href={href}>
                {children}
              </a>
            );
          }
          return (
            <a href={href} {...rest}>
              {children}
            </a>
          );
        },
        VideoPromo: VideoPromo,
        CtaCard: CTACard,
        Promo: Promo,
        YouTube: YouTube,
        Row: Row,
        Repository: Repository,
        Article: Article,
        Link: LinkItem,
      }}
    />
  );
};

const MarkdownContent = ({ partials, hasGrid = false }: MarkdownContentProps): JSX.Element => {
  if (hasGrid) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {partials.content.map((item, i) => (
          <div className="prose dark:prose-invert border-theme-border bg-theme-bg text-theme-text relative max-w-4xl border p-8" key={i}>
            <DecoratedMarkdown>{item}</DecoratedMarkdown>
            <EditButton editUrl={partials.fileNames[i]} classes="absolute right-2 bottom-2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <VerticalGroup>
      {partials.content.map((item, i) => (
        <div key={i}>
          <div className="prose dark:prose-invert max-w-4xl">
            <DecoratedMarkdown>{item}</DecoratedMarkdown>
          </div>
          <EditButton editUrl={partials.fileNames[i]} />
        </div>
      ))}
    </VerticalGroup>
  );
};

export const MarkdownPageContent = ({ partials }: MarkdownContentProps): JSX.Element => {
  return (
    <VerticalGroup>
      {partials.content.map((item, i) => (
        <div key={i}>
          <div className="prose dark:prose-invert prose-dev max-w-max">
            <DecoratedMarkdown>{item}</DecoratedMarkdown>
          </div>
          <EditButton editUrl={partials.fileNames[i]} />
        </div>
      ))}
    </VerticalGroup>
  );
};

export default MarkdownContent;
