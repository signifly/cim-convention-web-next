'use client'
import { GridContainer } from '@/components/GridContainer'
import { AdBlockRecord } from '@/types/generated'
import { Ad } from '@/components/Ad'

export const AdBlock = (props: AdBlockRecord) => {
  const { anchorId, banner, ad, ads } = props
  const tempAdCodeHtml = ad?.googleAdCodeHtml?.toString() || ''

  const styles = {
    section: {
      banner: 'bg-brand-grey-25 py-10 lg:py-16',
      default: 'py-6 lg:py-16',
    },
    grid: {
      banner: 'lg:place-items-center',
      default: 'grid-cols-1',
    },
    div: {
      banner: 'col-span-4 lg:col-span-8 lg:col-start-3 lg:px-8',
      default:
        'mx-10 flex flex-col gap-12 lg:col-span-10 lg:col-start-2 lg:mx-0 lg:flex-row',
    },
  }

  const styleOption = banner ? 'banner' : 'default'

  return (
    <section id={anchorId || undefined} className={styles.section[styleOption]}>
      <GridContainer className={styles.grid[styleOption]}>
        <div className={styles.div[styleOption]}>
          {banner && ad && <Ad {...ad} googleAdHtml={tempAdCodeHtml} />}{' '}
          {/* Ensure googleAdHtml prop is passed */}
          {!banner &&
            ads &&
            ads.map((each) => (
              <Ad key={each.id} {...each} googleAdHtml={tempAdCodeHtml} />
            ))}
          {/* Ensure googleAdHtml prop is passed */}
        </div>
      </GridContainer>
    </section>
  )
}

/*ALTERNATIVE METHOD WITH CUSTOM GOOGLE COMPONENT AND CONVERSION */
// Function to convert safe HTML to script if ever the dangerouslySetInnerHTML would fail to work.
// function convertSafeHtmlToScript(html: string) {
//   // Recherche la balise <script async> et la conserve
//   const asyncScriptMatch = html.match(/<script\s+async[^>]*>.*?<\/script>/i);
//   const asyncScript = asyncScriptMatch ? asyncScriptMatch[0] : '';

//   // Supprime la balise <script async> du HTML d'origine
//   const cleanedHtml = html.replace(asyncScript, '');

//   // Remplace les autres balises <script> par leur contenu
//   const convertedHtml = cleanedHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, (match) => {
//     const scriptContent = match.replace(/<script\b[^>]*>/i, '').replace(/<\/script>/i, '');
//     return `<script>${scriptContent}</script>`;
//   });

//   // Ajoute la balise <script async> avec le contenu conservé au début
//   const finalHtml = `${asyncScript}\n${convertedHtml.trim()}`;

//   return finalHtml;
// }

/*
export const GoogleAdComponent = ({ googleAdInputLine }: GoogleAdComponentProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (googleAdInputLine && adContainerRef.current) {
      try {
        const adContainer = adContainerRef.current;
        adContainer.innerHTML = ''; // Clear previous content
        const div = document.createElement('div');
        div.innerHTML = googleAdInputLine;
        adContainer.appendChild(div);
      } catch (error) {
        console.error('Error rendering Google Ad:', error);
      }
    }
  }, [googleAdInputLine]);
  return <div className="google-ad-box" ref={adContainerRef} />;
};


interface GoogleAdComponentProps {
  googleAdInputLine: string;
}
*/
