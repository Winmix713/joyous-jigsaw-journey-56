
import React from 'react';

const FooterSection = () => {
  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{' '}
            <a
              href="https://winmix.hu"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              WinMix
            </a>
            . Az oldal játékpénzzel működik, valódi pénzes fogadás nem lehetséges.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
